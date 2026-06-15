-- RLS Policies for NyayaSetu

-- Ensure RLS is enabled for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Utility function to get current user's role from JWT or user table
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
DECLARE
    role_val user_role;
BEGIN
    SELECT role INTO role_val FROM users WHERE id = auth.uid();
    RETURN role_val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Users Table Policies
-- Admins can view and edit everyone
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can update all users" ON users FOR UPDATE USING (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can insert users" ON users FOR INSERT WITH CHECK (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can delete users" ON users FOR DELETE USING (get_user_role() = 'ADMIN');

-- Users can view and edit themselves
CREATE POLICY "Users can view themselves" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update themselves" ON users FOR UPDATE USING (auth.uid() = id);

-- Advocates can view beneficiaries associated with their cases
CREATE POLICY "Advocates can view their beneficiaries" ON users FOR SELECT
USING (
    get_user_role() = 'ADVOCATE' AND
    id IN (
        SELECT c.beneficiary_id FROM cases c
        JOIN case_assignments ca ON c.id = ca.case_id
        WHERE ca.advocate_id = auth.uid()
    )
);


-- Cases Table Policies
-- Admins can view and manage all cases
CREATE POLICY "Admins can do everything on cases" ON cases FOR ALL USING (get_user_role() = 'ADMIN');

-- Beneficiaries can view and update their own cases (only in NEW or DOCUMENTS_REQUIRED state)
CREATE POLICY "Beneficiaries can view own cases" ON cases FOR SELECT USING (beneficiary_id = auth.uid());
CREATE POLICY "Beneficiaries can insert own cases" ON cases FOR INSERT WITH CHECK (beneficiary_id = auth.uid());
CREATE POLICY "Beneficiaries can update own cases" ON cases FOR UPDATE USING (beneficiary_id = auth.uid() AND status IN ('NEW', 'DOCUMENTS_REQUIRED'));

-- Advocates can view and update assigned cases
CREATE POLICY "Advocates can view assigned cases" ON cases FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = cases.id AND ca.advocate_id = auth.uid()
    )
);
CREATE POLICY "Advocates can update assigned cases" ON cases FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = cases.id AND ca.advocate_id = auth.uid()
    )
);


-- Case Assignments Policies
CREATE POLICY "Admins can manage assignments" ON case_assignments FOR ALL USING (get_user_role() = 'ADMIN');
CREATE POLICY "Advocates can view own assignments" ON case_assignments FOR SELECT USING (advocate_id = auth.uid());


-- Documents Policies
-- Admins can view all documents
CREATE POLICY "Admins can view all documents" ON documents FOR SELECT USING (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can manage documents" ON documents FOR ALL USING (get_user_role() = 'ADMIN');

-- Beneficiaries can upload and view documents for their cases
CREATE POLICY "Beneficiaries can view own case documents" ON documents FOR SELECT
USING (
    EXISTS (SELECT 1 FROM cases WHERE cases.id = documents.case_id AND cases.beneficiary_id = auth.uid())
);
CREATE POLICY "Beneficiaries can insert own case documents" ON documents FOR INSERT
WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (SELECT 1 FROM cases WHERE cases.id = documents.case_id AND cases.beneficiary_id = auth.uid())
);

-- Advocates can view and upload documents for assigned cases
CREATE POLICY "Advocates can view assigned case documents" ON documents FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = documents.case_id AND ca.advocate_id = auth.uid()
    )
);
CREATE POLICY "Advocates can insert assigned case documents" ON documents FOR INSERT
WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = documents.case_id AND ca.advocate_id = auth.uid()
    )
);


-- Notes Policies
-- Admins can see everything
CREATE POLICY "Admins can manage notes" ON notes FOR ALL USING (get_user_role() = 'ADMIN');

-- Advocates can see and create notes for assigned cases
CREATE POLICY "Advocates can view assigned case notes" ON notes FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = notes.case_id AND ca.advocate_id = auth.uid()
    )
);
CREATE POLICY "Advocates can insert notes" ON notes FOR INSERT
WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = notes.case_id AND ca.advocate_id = auth.uid()
    )
);

-- Beneficiaries can only see external notes on their cases
CREATE POLICY "Beneficiaries can view external notes" ON notes FOR SELECT
USING (
    is_internal = false AND
    EXISTS (SELECT 1 FROM cases WHERE cases.id = notes.case_id AND cases.beneficiary_id = auth.uid())
);


-- Status History Policies
CREATE POLICY "Admins can view status history" ON status_history FOR SELECT USING (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can insert status history" ON status_history FOR INSERT WITH CHECK (get_user_role() = 'ADMIN');

CREATE POLICY "Advocates can view assigned case status history" ON status_history FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = status_history.case_id AND ca.advocate_id = auth.uid()
    )
);
CREATE POLICY "Advocates can insert assigned case status history" ON status_history FOR INSERT
WITH CHECK (
    changed_by = auth.uid() AND
    EXISTS (
        SELECT 1 FROM case_assignments ca 
        WHERE ca.case_id = status_history.case_id AND ca.advocate_id = auth.uid()
    )
);

CREATE POLICY "Beneficiaries can view own case status history" ON status_history FOR SELECT
USING (
    EXISTS (SELECT 1 FROM cases WHERE cases.id = status_history.case_id AND cases.beneficiary_id = auth.uid())
);


-- Audit Logs Policies (Admins only)
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (get_user_role() = 'ADMIN');
CREATE POLICY "Admins can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (get_user_role() = 'ADMIN');
-- No one can delete or update audit logs

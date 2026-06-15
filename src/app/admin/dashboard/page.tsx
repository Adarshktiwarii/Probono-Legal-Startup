import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, Users, Clock, TrendingUp, FileText } from "lucide-react";

export default function AdminDashboard() {
  const applications = [
    { id: "NYA-2026-0891", name: "Rahul Verma", category: "Wrongful Arrest", income: "Below ₹1L", status: "Pending Review", date: "Jun 12, 2026" },
    { id: "NYA-2026-0892", name: "Sunita Devi", category: "Domestic Violence", income: "₹1L – ₹3L", status: "Verified", date: "Jun 10, 2026" },
    { id: "NYA-2026-0893", name: "Ramesh Kumar", category: "Bail Assistance", income: "Below ₹1L", status: "Assigned", date: "Jun 8, 2026" },
    { id: "NYA-2026-0894", name: "Meera Sharma", category: "Senior Abuse", income: "Below ₹1L", status: "Pending Review", date: "Jun 14, 2026" },
    { id: "NYA-2026-0895", name: "Arjun Singh", category: "Wrongful Arrest", income: "₹1L – ₹3L", status: "Rejected", date: "Jun 7, 2026" },
  ];

  const statusStyles: Record<string, string> = {
    "Pending Review": "bg-[#C69C3F]/10 text-[#C69C3F] border-[#C69C3F]/20",
    "Verified": "bg-[#1E3A5F]/8 text-[#1E3A5F] border-[#1E3A5F]/20",
    "Assigned": "bg-[#5B8A72]/10 text-[#5B8A72] border-[#5B8A72]/20",
    "Rejected": "bg-[#C75B39]/10 text-[#C75B39] border-[#C75B39]/20",
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      {/* Dashboard header */}
      <div className="ns-bar" aria-hidden="true">
        <span className="bar-blue" /><span className="bar-red" /><span className="bar-yellow" /><span className="bar-green" />
      </div>
      <header className="bg-white border-b border-[#e8e3db]">
        <div className="max-w-6xl mx-auto px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#1E3A5F] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">NS</span>
              </div>
            </Link>
            <span className="text-[#d4cfc7]">/</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#C75B39]" />
              <span className="text-sm font-medium text-[#1A1A2E]">Operations</span>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Exit dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-[#1A1A2E] mb-1">Welcome, Admin</h1>
          <p className="text-sm text-[#6B7280]">Here&apos;s an overview of current operations.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: "Pending Review", value: "142", color: "#C69C3F" },
            { icon: FileText, label: "Active Cases", value: "86", color: "#1E3A5F" },
            { icon: Users, label: "Empaneled Advocates", value: "45", color: "#5B8A72" },
            { icon: TrendingUp, label: "Resolution Rate", value: "92%", color: "#C75B39" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#e8e3db] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                <p className="text-xs text-[#6B7280]">{stat.label}</p>
              </div>
              <p className="text-2xl font-medium" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e8e3db] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#e8e3db] flex justify-between items-center">
            <h2 className="text-sm font-medium text-[#1A1A2E]">Recent applications</h2>
            <span className="text-xs text-[#6B7280]">{applications.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#e8e3db] hover:bg-transparent">
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">ID</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">Applicant</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">Category</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">Income</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-[11px] text-[#6B7280] uppercase tracking-wider text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id} className="border-[#e8e3db] hover:bg-[#F9F7F4]">
                    <TableCell className="text-sm font-medium text-[#1A1A2E] font-mono text-xs">{app.id}</TableCell>
                    <TableCell className="text-sm text-[#1A1A2E]">{app.name}</TableCell>
                    <TableCell className="text-sm text-[#6B7280]">{app.category}</TableCell>
                    <TableCell className="text-sm text-[#6B7280]">{app.income}</TableCell>
                    <TableCell className="text-sm text-[#6B7280]">{app.date}</TableCell>
                    <TableCell>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full border ${statusStyles[app.status]}`}>
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#1E3A5F] hover:bg-[#1E3A5F]/8 text-xs h-7">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}

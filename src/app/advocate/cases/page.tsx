"use client";

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, ChevronRight, Scale, LogOut, Bell } from "lucide-react";

const cases = [
  { id: "NYA-2026-0412", client: "Vikram Singh", title: "Bail Application", court: "Sessions Court, Patiala House", nextDate: "Oct 15, 2026" },
  { id: "NYA-2026-0550", client: "Priya Sharma", title: "Domestic Violence", court: "MM Court, Saket", nextDate: "Nov 02, 2026" },
];

export default function AdvocatePortal() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Dashboard header */}
      <div className="ns-bar" aria-hidden="true">
        <span className="bar-blue" /><span className="bar-red" /><span className="bar-yellow" /><span className="bar-green" />
      </div>
      <header className="bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#1E3A5F] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">NS</span>
              </div>
            </Link>
            <span className="text-[#d4cfc7]">/</span>
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#1E3A5F]" />
              <span className="text-sm font-medium text-foreground">Advocate Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-[#1E3A5F] font-medium text-[11px]">SC</span>
              </div>
              <span className="text-sm text-foreground">Adv. Sarah Chen</span>
            </div>
            <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Exit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-foreground mb-1">Welcome back, Sarah</h1>
          <p className="text-sm text-muted-foreground">Manage your pro bono assignments and hearing dates.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-background border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Active Cases</p>
            <p className="text-2xl font-medium text-[#1E3A5F]">2</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Upcoming Hearings</p>
            <p className="text-2xl font-medium text-[#C69C3F]">1</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-5 border-l-4 border-l-[#5B8A72]">
            <div className="flex items-center gap-1.5 mb-2">
              <Bell className="w-3.5 h-3.5 text-[#5B8A72]" />
              <p className="text-xs text-[#5B8A72] font-medium">New Assignment</p>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Bail Hearing — Domestic Violence (NYA-2026-0601)</p>
            <Button size="sm" className="bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-xs rounded-full h-7 px-4 shadow-none">
              Review Case Brief
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1E3A5F]" /> Active Assignments
            </h3>
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent bg-muted">
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider">Case ID</TableHead>
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider">Client</TableHead>
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider">Matter</TableHead>
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider">Court</TableHead>
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider">Next Date</TableHead>
                      <TableHead className="text-[11px] text-muted-foreground uppercase tracking-wider text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map((row) => (
                      <TableRow key={row.id} className="border-border hover:bg-muted">
                        <TableCell className="text-xs font-mono text-foreground">{row.id}</TableCell>
                        <TableCell className="text-sm text-foreground">{row.client}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{row.title}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.court}</TableCell>
                        <TableCell className="text-sm text-[#C69C3F] font-medium">{row.nextDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-[#1E3A5F] hover:bg-primary/10 text-xs h-7">
                            Manage <ChevronRight className="w-3 h-3 ml-0.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1E3A5F]" /> Schedule
            </h3>
            <div className="bg-background border border-border rounded-xl p-5 space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-[#1E3A5F] shrink-0">
                  <span className="text-[9px] font-medium uppercase leading-none">Oct</span>
                  <span className="text-sm font-medium leading-none mt-0.5">15</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Bail Hearing</p>
                  <p className="text-xs text-muted-foreground">State vs Vikram Singh</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">10:30 AM · Sessions Court</p>
                </div>
              </div>
              <div className="border-t border-border" />
              <div className="flex gap-3">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-[#F5F3EE] text-muted-foreground shrink-0">
                  <span className="text-[9px] font-medium uppercase leading-none">Nov</span>
                  <span className="text-sm font-medium leading-none mt-0.5">02</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Document Submission</p>
                  <p className="text-xs text-muted-foreground">Priya Sharma — DV Protection</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Submit to MM Court Registry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

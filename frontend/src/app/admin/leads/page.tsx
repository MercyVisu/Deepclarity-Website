"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminLeads } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }

    getAdminLeads().then(({ data, error }) => {
      if (error) { router.push("/admin/login"); return; }
      setLeads((data as Array<Record<string, unknown>>) || []);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-width py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-primary-500"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-display font-bold text-primary-900">Leads</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Class</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">No leads yet</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id as number} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{lead.name as string}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.email as string}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.phone as string}</td>
                      <td className="px-4 py-3 capitalize">{lead.user_type as string}</td>
                      <td className="px-4 py-3">{(lead.current_class as string) || "-"}</td>
                      <td className="px-4 py-3"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{lead.source as string}</span></td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{lead.status as string}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

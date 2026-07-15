"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAdminStats } from "@/lib/api";
import { Calendar, Mail, Users, BarChart3, FileText, MessageSquare, Settings, LogOut } from "lucide-react";

interface Stats {
  total_appointments: number;
  total_contacts: number;
  unread_contacts: number;
  total_leads: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    getAdminStats().then(({ data, error }) => {
      if (error) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      } else {
        setStats(data || null);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/appointments", icon: Calendar, label: "Appointments" },
    { href: "/admin/contacts", icon: Mail, label: "Contacts" },
    { href: "/admin/leads", icon: Users, label: "Leads" },
    { href: "/admin/testimonials", icon: FileText, label: "Testimonials" },
    { href: "/admin/blogs", icon: FileText, label: "Blogs" },
    { href: "/admin/chat-history", icon: MessageSquare, label: "Chat History" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-width py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome back to DeepClariti admin panel</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Appointments", value: stats?.total_appointments || 0, icon: Calendar, color: "bg-blue-50 text-blue-600" },
            { label: "Contact Messages", value: stats?.total_contacts || 0, icon: Mail, color: "bg-green-50 text-green-600" },
            { label: "Unread Messages", value: stats?.unread_contacts || 0, icon: Mail, color: "bg-orange-50 text-orange-600" },
            { label: "Total Leads", value: stats?.total_leads || 0, icon: Users, color: "bg-purple-50 text-purple-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer text-center">
                <item.icon size={24} className="text-primary-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

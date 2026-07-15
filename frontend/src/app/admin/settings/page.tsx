"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-width py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-primary-500"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-display font-bold text-primary-900">Settings</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          <p>Admin settings and configuration management.</p>
        </div>
      </div>
    </div>
  );
}

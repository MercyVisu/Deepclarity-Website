"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container-width py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-primary-500 hover:border-primary-300 transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-primary-900">
                Manage Testimonials
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Add, edit, and publish client testimonials
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors">
            <MessageSquarePlus size={16} />
            Add Testimonial
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageSquarePlus size={24} className="text-primary-500" />
          </div>
          <h3 className="text-lg font-display font-semibold text-primary-900 mb-2">
            No Testimonials Yet
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Click &quot;Add Testimonial&quot; above to start adding client
            reviews that will appear on your public testimonials page.
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitConsultation } from "@/lib/api";
import { Phone, CheckCircle2, Clock, Shield, Users, Sparkles } from "lucide-react";

const interestOptions = [
  { value: "exploring", label: "Just exploring options" },
  { value: "one_time", label: "Want a one-time consultation" },
  { value: "immediate", label: "Ready to join immediately" },
];

export default function FreeConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    user_type: "student",
    current_class: "",
    interest_level: "",
    query: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMsg("");

    const { data, error } = await submitConsultation(formData);
    if (error) {
      setStatus("error");
      setErrorMsg(error);
    } else {
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        user_type: "student",
        current_class: "",
        interest_level: "",
        query: "",
      });
    }
  };

  return (
    <section className="bg-cream-50 py-16 md:py-24">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left side — context panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                Free 30-Minute Call
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-900 leading-tight">
              Book Your Free Consultation
            </h1>

            <p className="mt-5 text-gray-600 leading-relaxed">
              A no-obligation introductory call with Swaminathan to understand your
              needs and explore how we can help — no scripts, no pressure,
              just an honest conversation.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">30 Minutes</p>
                  <p className="text-sm text-gray-500">
                    Focused, unhurried conversation about your situation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">No Obligation</p>
                  <p className="text-sm text-gray-500">
                    Zero pressure to book anything further afterward
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">1-on-1 with Swaminathan</p>
                  <p className="text-sm text-gray-500">
                    Direct call with our International Certified Career Coach
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-primary-600 font-medium">
              <Phone size={16} />
              <span>Usually booked within 24 hours</span>
            </div>
          </motion.div>

          {/* Right side — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <CheckCircle2 size={48} className="text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-primary-900">
                  Request Received!
                </h3>
                <p className="text-gray-600 mt-2">
                  We&apos;ll contact you within 24 hours to schedule your free
                  consultation.
                </p>
                <Button className="mt-6" onClick={() => setStatus("idle")}>
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-gold-500" />
                  <span className="text-sm font-semibold text-primary-900 uppercase tracking-wide">
                    Your Details
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Phone *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      I am a *
                    </label>
                    <select
                      value={formData.user_type}
                      onChange={(e) =>
                        setFormData({ ...formData, user_type: e.target.value })
                      }
                      className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Current Class/Year
                    </label>
                    <Input
                      value={formData.current_class}
                      onChange={(e) =>
                        setFormData({ ...formData, current_class: e.target.value })
                      }
                      placeholder="e.g., Class 10, 2nd Year"
                    />
                  </div>
                </div>

                {/* Interest-level question — shows for both Student and Parent */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-gold-50 border border-gold-200 rounded-lg p-4"
                >
                  <label className="block text-sm font-semibold text-primary-900 mb-3">
                    What best describes where you are right now? *
                  </label>
                  <div className="space-y-2">
                    {interestOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="interest_level"
                          required
                          value={opt.value}
                          checked={formData.interest_level === opt.value}
                          onChange={(e) =>
                            setFormData({ ...formData, interest_level: e.target.value })
                          }
                          className="w-4 h-4 accent-primary-500"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </motion.div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Your Query *
                  </label>
                  <Textarea
                    required
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="What would you like to discuss in your free consultation?"
                    rows={4}
                  />
                </div>

                {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}

                <Button
                  type="submit"
                  className="w-full py-3 text-base font-semibold rounded-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Request Free Consultation"}
                </Button>

                <p className="text-center text-xs text-gray-500">
                  No payment required. No obligation. 100% free.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

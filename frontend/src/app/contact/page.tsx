"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/lib/api";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    user_type: "Stream selection (Grade 9-10)",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { data, error } = await submitContact(formData);
    if (error) {
      setStatus("error");
      setErrorMsg(error);
    } else {
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        user_type: "Stream selection (Grade 9-10)",
        message: "",
      });
    }
  };

  return (
    <section className="bg-cream-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-primary-800 text-white px-8 py-16 md:px-12 lg:py-24 flex flex-col justify-center"
        >
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-400 uppercase">
                Get in Touch
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold leading-snug">
              Your child won&apos;t get this decision back. Let&apos;s get it right.
            </h1>

            <p className="mt-6 text-white/80 leading-relaxed">
              Book a free 20-minute intro call — no pressure, no obligation.
              Just a clear-eyed conversation about where you or your child are
              right now.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-white/60">
                    Email
                  </p>
                  <p className="mt-1 font-medium">hello@deepclariti.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-white/60">
                    Phone / WhatsApp
                  </p>
                  <p className="mt-1 font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-white/60">
                    Location
                  </p>
                  <p className="mt-1 font-medium">
                    Chennai, Tamil Nadu · Online Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="px-8 py-16 md:px-12 lg:py-24 flex items-center bg-cream-50"
        >
          <div className="w-full max-w-lg">
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800">Message Sent!</h3>
                <p className="text-green-700 mt-2">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <Button className="mt-4" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Your Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91"
                      className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    I&apos;m reaching out about
                  </label>
                  <select
                    value={formData.user_type}
                    onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                    className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="Stream selection (Grade 9-10)">
                      Stream selection (Grade 9-10)
                    </option>
                    <option value="College & course selection">
                      College &amp; course selection
                    </option>
                    <option value="Career transition">Career transition</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Tell me a little about your situation
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What's on your mind?"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 text-base font-semibold rounded-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Book My Free Intro Call"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
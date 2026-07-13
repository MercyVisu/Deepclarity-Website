"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookSession } from "@/lib/api";
import { Calendar, CheckCircle2, Clock, Video, MessageCircle } from "lucide-react";

export default function BookSessionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    user_type: "student",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { data, error } = await bookSession(formData);
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
        preferred_date: "",
        preferred_time: "",
        message: "",
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
                Career Coaching Session
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-900 leading-tight">
              Book a Career Coaching Session
            </h1>

            <p className="mt-5 text-gray-600 leading-relaxed">
              Schedule a one-on-one session with Swaminathan for in-depth career
              guidance — built around who your child actually is, not a
              generic checklist.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">60-Minute Deep Dive</p>
                  <p className="text-sm text-gray-500">
                    A full session focused entirely on your goals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <Video size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">In-Person or Online</p>
                  <p className="text-sm text-gray-500">
                    Chennai in-person, or online worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">Direct with Swaminathan</p>
                  <p className="text-sm text-gray-500">
                    Personally led, no junior counselors
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-primary-600 font-medium">
              <Calendar size={16} />
              <span>Confirmed within 24 hours of booking</span>
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
                  Session Booked!
                </h3>
                <p className="text-gray-600 mt-2">
                  We&apos;ll confirm your appointment within 24 hours.
                </p>
                <Button className="mt-6" onClick={() => setStatus("idle")}>
                  Book Another Session
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gold-500" />
                  <span className="text-sm font-semibold text-primary-900 uppercase tracking-wide">
                    Your Details
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    I am a *
                  </label>
                  <select
                    value={formData.user_type}
                    onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                    className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Preferred Date *
                    </label>
                    <Input
                      required
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) =>
                        setFormData({ ...formData, preferred_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Preferred Time *
                    </label>
                    <Input
                      required
                      type="time"
                      value={formData.preferred_time}
                      onChange={(e) =>
                        setFormData({ ...formData, preferred_time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific topics or questions you'd like to discuss?"
                    rows={4}
                  />
                </div>

                {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}

                <Button
                  type="submit"
                  className="w-full py-3 text-base font-semibold rounded-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Booking..." : "Book Session"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
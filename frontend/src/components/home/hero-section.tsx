"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-16 md:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container-width relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <span className="w-8 h-[2px] bg-gold-500 inline-block" />
            <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
              Career &amp; Life Coaching · Chennai &amp; Online
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-900 leading-tight"
          >
            Stop guessing your child&apos;s future. Start{" "}
            <span className="italic text-primary-500">knowing</span> it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            One clear, evidence-based path from confusion to confidence — for
            students choosing a stream, picking a college, or a young
            professional rethinking their next move. No generic tests. No
            pushy sales pitch. Just clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center"
          >
            <Link href="/book-session">
              <Button
                size="sm"
                className="px-6 py-2.5 text-sm font-semibold rounded-md"
              >
                Book a Free 30-Min Call
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-sm text-gray-400"
          >
            Free intro call · No obligation · Usually booked within 24 hours
          </motion.p>
        </div>
      </div>
    </section>
  );
}
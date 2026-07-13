"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container-width relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Ready to Find Your Path?
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Every student&apos;s journey is unique. Let Swami help you — or your child — discover
            the right direction with clarity, confidence, and zero pressure.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-session">
              <Button size="xl" variant="gold" className="group">
                Book Career Coaching Session
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/free-consultation">
              <Button
                size="xl"
                className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20"
              >
                Start with FREE Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const stats = [
  { value: "25+", label: "Years Coaching" },
  { value: "1,200+", label: "Students & Families Guided" },
  { value: "CDA USA", label: "Internationally Certified" },
  { value: "96%", label: "Would Recommend Us" },
];

const checks = [
  "Certified Career Development Associate, CDA USA",
  "Globally Validated Psychometric Tools",
  "Student & Parent Joint Sessions",
  "In-Person in Chennai or Online Worldwide",
];

export function StatsSection() {
  return (
    <section>
      <div className="bg-primary-500">
        <div className="container-width py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm tracking-wide uppercase text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-100">
        <div className="container-width py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-gray-600 text-xs md:text-sm uppercase tracking-wide"
              >
                <Check size={16} strokeWidth={2.5} className="text-primary-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
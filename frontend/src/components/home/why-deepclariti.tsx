"use client";

import { motion } from "framer-motion";
import { Target, Shield, Lightbulb, Users } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Clarity Over Confusion",
    description:
      "We replace career confusion with clear, data-backed direction tailored to each individual's unique strengths and interests.",
  },
  {
    icon: Shield,
    title: "Internationally Certified",
    description:
      "Our approach is grounded in globally validated psychometric tools and international certification standards (CDA, USA).",
  },
  {
    icon: Lightbulb,
    title: "Self-Awareness First",
    description:
      "We believe confident career decisions start with deep self-understanding — not random choices from a list of options.",
  },
  {
    icon: Users,
    title: "Family-Inclusive",
    description:
      "We involve parents in the process, bridging generational expectations with modern career realities — without pressure.",
  },
];

export function WhyDeepClariti() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Why DeepClariti?</h2>
          <p className="section-subheading mx-auto mt-4">
            We don&apos;t just suggest careers — we help you discover the right one through
            science-backed guidance and deep personal coaching.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-5">
                <reason.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

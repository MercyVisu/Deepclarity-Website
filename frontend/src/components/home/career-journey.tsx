"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Self-Discovery",
    description: "Understand your strengths, interests, aptitudes, personality, and values through guided reflection and psychometric tools.",
  },
  {
    number: "02",
    title: "Career Exploration",
    description: "Map your self-awareness to real career paths. Discover options you may not have considered.",
  },
  {
    number: "03",
    title: "Decision Making",
    description: "Make a confident, well-informed career decision backed by data, self-knowledge, and expert guidance.",
  },
  {
    number: "04",
    title: "Action Planning",
    description: "Create a clear roadmap with next steps — courses, colleges, skills, and timelines tailored to your path.",
  },
];

const benefits = [
  "Genuine self-awareness that lasts a lifetime",
  "Confident decisions backed by psychometric data",
  "No pressure — only clarity and support",
  "Family involvement without conflict",
  "Practical roadmap with clear next steps",
  "Ongoing support through your career journey",
];

export function CareerJourney() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Your Career Journey</h2>
          <p className="section-subheading mx-auto mt-4">
            A structured, supportive process that takes you from confusion to confidence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-5xl font-bold text-primary-100 mb-3">{step.number}</div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">What You Gain</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

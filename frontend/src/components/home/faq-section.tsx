"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What age group is career coaching suitable for?",
    answer:
      "Career coaching at DeepClariti is ideal for students from Class 8 onwards, as well as college students and early-career professionals. The earlier you start building self-awareness, the better-equipped you'll be for career decisions.",
  },
  {
    question: "What is a psychometric assessment?",
    answer:
      "It's an internationally validated, scientifically designed tool that measures aptitudes, interests, personality traits, and values. Unlike casual online quizzes, our assessments are administered by a certified professional and provide deep, accurate insights into career fit.",
  },
  {
    question: "How is DeepClariti different from regular career counseling?",
    answer:
      "We don't just hand you a list of careers. Our approach starts with deep self-awareness — understanding who you are — and then maps that to career paths. It's personalized, science-backed, and involves the family in a supportive way.",
  },
  {
    question: "Do parents need to be involved?",
    answer:
      "We encourage family involvement because career decisions affect everyone. However, the level of involvement is flexible — some families prefer joint sessions, others prefer separate parent-guidance calls. We adapt to your needs.",
  },
  {
    question: "What happens in a free consultation?",
    answer:
      "It's a 30-minute introductory call with Swami where we understand your current situation, answer your questions, and explain how DeepClariti can help. There's absolutely no obligation or pressure to sign up after the call.",
  },
  {
    question: "How many sessions are typically needed?",
    answer:
      "Most students benefit from 3-5 structured sessions that cover self-discovery, psychometric assessment, career exploration, and action planning. The exact number depends on individual needs.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading mx-auto mt-4">
            Everything you need to know about career coaching with DeepClariti.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-primary-900 pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

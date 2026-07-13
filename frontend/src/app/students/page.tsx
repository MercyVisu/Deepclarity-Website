"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Brain, Map, Lightbulb, CheckCircle2 } from "lucide-react";

export default function StudentsPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-accent-50 to-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-accent-100 rounded-full px-4 py-1.5 mb-4">
              <GraduationCap size={16} className="text-accent-600" />
              <span className="text-sm font-medium text-accent-700">For Students</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              Your Career, Your Choice — Made with Confidence
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              You don&apos;t need to have everything figured out. You just need the right guidance to
              discover what truly fits you — and that starts with understanding yourself.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Brain, title: "Discover Your Strengths", desc: "Learn what you're naturally good at — not just academically, but the thinking patterns and abilities that will fuel your career." },
              { icon: Map, title: "Explore Career Paths", desc: "Go beyond the obvious options. Discover careers that match who you actually are, including paths you've never considered." },
              { icon: Lightbulb, title: "Navigate the AI Era", desc: "Understand which careers will thrive in an AI-driven world and how to position yourself for the future." },
              { icon: GraduationCap, title: "Plan Your Education", desc: "Get clarity on stream selection, course choices, and college planning aligned with your career direction." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-gray-200 hover:border-accent-300 transition-colors"
              >
                <item.icon size={28} className="text-accent-500 mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Common Questions Students Have</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Should I follow my passion or choose something stable?",
                "How do I know what I'm good at?",
                "What if I pick the wrong career?",
                "Should I do what my parents want?",
                "What careers will exist in 10 years?",
                "How do I choose between Science and Commerce?",
              ].map((q) => (
                <div key={q} className="flex items-start space-x-3">
                  <CheckCircle2 size={16} className="text-accent-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-sm">{q}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600">
              If any of these sound familiar, career coaching can help you find clear answers.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/free-consultation">
              <Button size="lg">Book Your Free Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

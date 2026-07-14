"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Globe, Heart, Users, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 md:py-24">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                About Your Coach
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              About DeepClariti
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              DeepClariti was born from a simple belief: every student
              deserves to make career decisions from a place of clarity and
              confidence — not confusion and pressure.
            </p>
          </motion.div>

          {/* Supporting stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "25+", label: "Years Coaching" },
              { value: "1,200+", label: "Students Guided" },
              { value: "CDA USA", label: "Certified" },
              { value: "96%", label: "Would Recommend" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-100 shadow-sm py-6 px-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-500">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-8 h-[2px] bg-gold-500 inline-block" />
                <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-primary-900 mb-6">
                Why DeepClariti Exists
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded by V. Swaminathan, DeepClariti emerged from
                  years of observing students struggle with career decisions —
                  not because they lacked options, but because they lacked
                  self-understanding.
                </p>
                <p>
                  As an International Certified Career Coach (CDA, USA), Swaminathan
                  saw that the most confident career decisions always started
                  with genuine self-awareness. Students who understood their
                  strengths, interests, and values made choices they never
                  regretted.
                </p>
                <p>
                  Today, DeepClariti helps students and families navigate
                  career decisions with clarity, using internationally
                  validated psychometric tools and deeply personal coaching
                  conversations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-cream-100 rounded-2xl p-8 md:p-12 border border-primary-100"
            >
              <div className="text-center">
                <img src="/founder.jpg" alt="V. Swaminathan" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-primary-200" />
                <h3 className="text-xl font-display font-bold text-primary-900">
                  V. Swaminathan
                </h3>
                <p className="text-primary-500 font-medium mt-1">
                  Founder &amp; Career Coach
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  International Certified Career Coach · CDA, USA
                </p>

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <Award size={18} className="text-primary-500" />
                    <span className="text-sm text-gray-700">
                      Career Development Associate (CDA, USA)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <Globe size={18} className="text-primary-500" />
                    <span className="text-sm text-gray-700">
                      Globally Certified Psychometric Tools
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                    <BookOpen size={18} className="text-primary-500" />
                    <span className="text-sm text-gray-700">
                      25+ Years of Career Coaching
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                What We Stand For
              </span>
            </div>
            <h2 className="section-heading">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Empathy First",
                description:
                  "We listen deeply, understand without judgment, and meet every student where they are.",
              },
              {
                icon: Target,
                title: "Clarity Over Confusion",
                description:
                  "Our goal is always to replace uncertainty with clear, actionable understanding.",
              },
              {
                icon: Users,
                title: "Family Harmony",
                description:
                  "We bridge generational gaps, involving parents without creating pressure.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <value.icon size={24} className="text-primary-500" />
                </div>
                <h3 className="text-lg font-display font-semibold text-primary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-900 text-center">
        <div className="container-width">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Book a free consultation to see how DeepClariti can help you or
            your child.
          </p>
          <Link href="/free-consultation">
            <Button variant="gold" size="lg">
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
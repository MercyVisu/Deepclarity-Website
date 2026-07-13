"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CareerCoachingPage() {
  return (
    <>
      <section className="bg-cream-50 py-16 md:py-20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                Personalized Guidance
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              Career Coaching
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Personalized career coaching that combines psychometric science
              with deep personal guidance to help you make career decisions
              you&apos;ll never regret.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/book-session">
                <Button size="lg" className="group">
                  Book a Session
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/free-consultation">
                <Button variant="outline" size="lg">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                The Process
              </span>
            </div>
            <h2 className="text-3xl font-display font-bold text-primary-900 mb-8">
              What to Expect
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Initial Consultation",
                  desc: "A free 30-minute call to understand your situation, answer questions, and see if we're a good fit.",
                },
                {
                  title: "Self-Discovery Phase",
                  desc: "Deep exploration of your strengths, interests, aptitudes, personality, and values through guided reflection and psychometric tools.",
                },
                {
                  title: "Assessment & Analysis",
                  desc: "Internationally validated psychometric assessments administered and interpreted by a certified professional.",
                },
                {
                  title: "Career Exploration",
                  desc: "Mapping your self-awareness to real career paths. Discovering options you may not have considered.",
                },
                {
                  title: "Decision & Planning",
                  desc: "Making a confident career decision backed by data and self-knowledge, with a clear action plan.",
                },
                {
                  title: "Ongoing Support",
                  desc: "Continued guidance as you take the next steps in your career journey.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex space-x-4"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-cream-100 border border-primary-100 rounded-xl p-8">
              <h3 className="text-xl font-display font-bold text-primary-900 mb-4">
                Who is this for?
              </h3>
              <ul className="space-y-3">
                {[
                  "Students in Class 8-12 choosing streams or careers",
                  "College students uncertain about their direction",
                  "Young professionals considering a career change",
                  "Parents wanting to support their child's career decisions",
                  "Anyone feeling confused or pressured about career choices",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <CheckCircle2
                      size={18}
                      className="text-primary-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
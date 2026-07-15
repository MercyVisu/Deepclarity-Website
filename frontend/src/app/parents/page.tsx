"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Heart, Shield, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ParentsPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-1.5 mb-4">
              <Users size={16} className="text-primary-600" />
              <span className="text-sm font-medium text-primary-700">For Parents</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              Building Confidence, Not Pressure
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              You want the best for your child. We help you support their career journey in a way
              that builds confidence, preserves your relationship, and leads to genuinely good decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Heart, title: "Understand Their Strengths", desc: "See your child through the lens of their natural abilities — not just academic scores. Discover what they're truly capable of." },
              { icon: Shield, title: "Support Without Pressure", desc: "Learn how to encourage and guide without creating anxiety. Your involvement matters, but so does how you show up." },
              { icon: MessageCircle, title: "Bridge the Gap", desc: "Career options today are vastly different from a generation ago. We help translate modern realities into family conversations." },
              { icon: Users, title: "Be Part of the Journey", desc: "Parent-inclusive sessions where you can ask questions, share concerns, and participate constructively in the process." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <item.icon size={28} className="text-primary-500 mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">What Parents Often Tell Us</h2>
            <div className="space-y-4">
              {[
                "\"I don't know how to guide my child without pushing my own preferences.\"",
                "\"My child seems confused and I don't know how to help.\"",
                "\"I worry they'll choose something impractical.\"",
                "\"I want them to be happy AND financially secure.\"",
                "\"Every time we discuss careers, it ends in an argument.\"",
              ].map((q) => (
                <div key={q} className="flex items-start space-x-3">
                  <CheckCircle2 size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{q}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600">
              If this resonates, you&apos;re not alone — and we can help.
            </p>
          </div>

          <div className="text-center">
            <Link href="/free-consultation">
              <Button size="lg">Book a Free Parent Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

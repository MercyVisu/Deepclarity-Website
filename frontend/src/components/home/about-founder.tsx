"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen, Globe } from "lucide-react";

export function AboutFounder() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="max-w-sm mx-auto aspect-[4/5] bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl overflow-hidden relative">
  <Image
    src="/founder-photo.png"
    alt="V. Swaminathan - Founder, DeepClariti"
    fill
    className="object-cover object-top"
    priority
  />
</div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-heading">Meet the Founder</h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              V. Swaminathan is an International Certified Career Coach with a
              Career Development Administrator (CDA) certification from the USA. With years
              of dedicated experience, Swaminathan combines psychometric science with deep personal
              coaching to help students and professionals make truly confident career decisions.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              His philosophy is simple: self-awareness is the foundation of every good career
              decision. He works closely with each individual to uncover their natural strengths,
              interests, aptitudes, and values — then maps these to career paths that genuinely fit.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <Award size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm font-medium text-primary-800">CDA Certified (USA)</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <Globe size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm font-medium text-primary-800">Global Standards</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <BookOpen size={20} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm font-medium text-primary-800">Psychometric Expert</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
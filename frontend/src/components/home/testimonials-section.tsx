"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arun K.",
    role: "Engineering Student",
    content:
      "Swami helped me see strengths I never recognized in myself. I went from confused about my career to confident about my path in just a few sessions.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Parent",
    content:
      "As a parent, I was anxious about my daughter's career choices. Swami's approach helped us both understand her potential without any pressure.",
    rating: 5,
  },
  {
    name: "Vikram S.",
    role: "Class 11 Student",
    content:
      "The psychometric assessment was eye-opening. I discovered career paths I'd never considered but that perfectly match who I am.",
    rating: 5,
  },
  {
    name: "Lakshmi R.",
    role: "Parent",
    content:
      "DeepClariti's approach is completely different from typical career counseling. It starts with understanding the child, not pushing options on them.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-8 h-[2px] bg-gold-500 inline-block" />
            <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="section-heading">What People Say</h2>
          <p className="section-subheading mx-auto mt-4">
            Real stories from students and parents who found clarity through
            DeepClariti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-cream-100 border border-primary-100 rounded-xl p-6 md:p-8 relative"
            >
              <Quote size={32} className="text-primary-200 absolute top-6 right-6" />
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-primary-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Compass, Brain, Users, TrendingUp, GraduationCap, Heart } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Career Path Discovery",
    description: "Uncover the career direction that aligns with your unique strengths, interests, and personality.",
    href: "/career-coaching",
  },
  {
    icon: Brain,
    title: "Psychometric Assessments",
    description: "Internationally validated tools that reveal natural aptitudes and career fit areas.",
    href: "/services",
  },
  {
    icon: GraduationCap,
    title: "Student Guidance",
    description: "Stream selection, course planning, and career clarity for students from Class 8 onwards.",
    href: "/students",
  },
  {
    icon: Users,
    title: "Parent Counseling",
    description: "Bridge the gap between expectations and aspirations. Support your child's journey without pressure.",
    href: "/parents",
  },
  {
    icon: TrendingUp,
    title: "Career Transition",
    description: "For professionals seeking clarity on their next career move with confidence.",
    href: "/career-coaching",
  },
  {
    icon: Heart,
    title: "One-on-One Coaching",
    description: "Deep personal sessions with Swami to build genuine self-awareness and career confidence.",
    href: "/book-session",
  },
];

export function ServicesSection() {
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
          <h2 className="section-heading">Our Services</h2>
          <p className="section-subheading mx-auto mt-4">
            Comprehensive career guidance tailored to your unique journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <Card className="h-full cursor-pointer hover:border-primary-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                      <service.icon size={22} className="text-primary-500" />
                    </div>
                    <CardTitle className="group-hover:text-primary-500 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

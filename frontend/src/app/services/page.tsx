"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Compass, Brain, Users, TrendingUp, GraduationCap, Heart, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Career Path Discovery",
    description: "A comprehensive process to uncover the career direction that aligns with your unique strengths, interests, personality, and values.",
    features: ["Detailed self-exploration exercises", "Interest and values mapping", "Career options analysis", "Personalized recommendations"],
  },
  {
    icon: Brain,
    title: "Psychometric Assessments",
    description: "Internationally validated tools administered by a certified professional to reveal your natural aptitudes and career fit areas.",
    features: ["Aptitude assessment", "Personality profiling", "Interest inventory", "Career matching report"],
  },
  {
    icon: GraduationCap,
    title: "Student Guidance",
    description: "Helping students from Class 8 onwards make informed decisions about streams, courses, and career directions.",
    features: ["Stream selection guidance", "Course and college planning", "Competitive exam readiness", "AI-era career awareness"],
  },
  {
    icon: Users,
    title: "Parent Counseling",
    description: "Dedicated sessions to help parents understand, support, and constructively participate in their child's career journey.",
    features: ["Understanding your child's strengths", "Managing expectations", "Bridging generational gaps", "Supportive involvement"],
  },
  {
    icon: TrendingUp,
    title: "Career Transition Coaching",
    description: "For professionals at crossroads — helping you evaluate, plan, and confidently move into your next career chapter.",
    features: ["Skills and strengths audit", "Market opportunity analysis", "Transition planning", "Confidence building"],
  },
  {
    icon: Heart,
    title: "One-on-One Deep Coaching",
    description: "Intensive personal sessions with Swami for those who want the deepest level of career clarity and self-understanding.",
    features: ["Multiple in-depth sessions", "Complete psychometric battery", "Family involvement option", "Ongoing support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream-50 py-16 md:py-20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                What We Offer
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Comprehensive career guidance services designed to help you
              discover your path with clarity and confidence. Every service
              is personalized to your unique situation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-gray-100 shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                      <service.icon size={22} className="text-primary-500" />
                    </div>
                    <CardTitle className="text-xl font-display text-primary-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-primary-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">Not sure which service is right for you?</p>
            <Link href="/free-consultation">
              <Button size="lg">Book a Free Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
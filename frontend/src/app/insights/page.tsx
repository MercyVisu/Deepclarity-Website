"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Why Self-Awareness Matters Before Choosing Any Career",
    slug: "self-awareness-before-career-choice",
    excerpt: "Most students approach career planning the wrong way — they start with a list of options. The ones who make confident decisions start somewhere else.",
    category: "Career Discovery",
    readTime: "6 min read",
  },
  {
    title: "Choosing a Career in an AI-Driven World",
    slug: "ai-driven-career-choices",
    excerpt: "AI is transforming every industry. How should students think about career choices when the job market is evolving so rapidly?",
    category: "Future Careers",
    readTime: "5 min read",
  },
  {
    title: "Passion vs Stability: The False Choice",
    slug: "passion-vs-stability",
    excerpt: "Students are often told to choose between passion and stability. The truth is more nuanced — and more hopeful.",
    category: "Career Decisions",
    readTime: "5 min read",
  },
  {
    title: "Building Confidence, Not Pressure: A Guide for Parents",
    slug: "parents-confidence-not-pressure",
    excerpt: "How parents can support their children's career journey in a way that builds confidence rather than creating anxiety.",
    category: "For Parents",
    readTime: "7 min read",
  },
];

export default function InsightsPage() {
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
                From the Blog
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900">
              Insights
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Thought-provoking articles on career decisions, self-awareness,
              and navigating the modern career landscape.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/insights/${article.slug}`}>
                  <Card className="h-full cursor-pointer group border border-gray-100 shadow-sm hover:border-primary-300 transition-colors">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                      <CardTitle className="font-display group-hover:text-primary-500 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                      <span className="text-primary-500 text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                        Read article <ArrowRight size={14} className="ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
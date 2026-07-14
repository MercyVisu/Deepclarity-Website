"use client";
 
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
 
const testimonials = [
  { name: "Arun K.", role: "Engineering Student", content: "Swami helped me see strengths I never recognized in myself. I went from confused about my career to confident about my path in just a few sessions.", rating: 5 },
  { name: "Priya M.", role: "Parent", content: "As a parent, I was anxious about my daughter's career choices. Swami's approach helped us both understand her potential without any pressure.", rating: 5 },
  { name: "Vikram S.", role: "Class 11 Student", content: "The psychometric assessment was eye-opening. I discovered career paths I'd never considered but that perfectly match who I am.", rating: 5 },
  { name: "Lakshmi R.", role: "Parent", content: "DeepClariti's approach is completely different from typical career counseling. It starts with understanding the child, not pushing options.", rating: 5 },
  { name: "Rahul T.", role: "College Student", content: "I was about to choose a career just because my friends were doing it. Swami helped me find something that genuinely excites me.", rating: 5 },
  { name: "Meena G.", role: "Parent of 2", content: "Both my children went through DeepClariti's process. Each got completely different recommendations tailored to who they are. That's rare.", rating: 5 },
  { name: "Karthik V.", role: "Class 12 Student", content: "I thought I had to choose between passion and stability. Swami showed me there are paths that offer both — I just hadn't seen them.", rating: 5 },
  { name: "Sunitha P.", role: "Parent", content: "For the first time, my son and I had a productive career conversation without arguments. DeepClariti made that possible.", rating: 5 },
];
 
const videoTestimonials = [
  { name: "Student", role: "College Student", src: "/vedios/testimonial-1.mp4" },
  { name: "Parent", role: "Parent", src: "/vedios/testimonial-2.mp4" },
];
 
function VideoCard({ name, role, src }: { name: string; role: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
 
  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };
 
  return (
    <div className="bg-cream-100 border border-primary-100 rounded-xl overflow-hidden">
      <div className="relative aspect-[9/16] bg-primary-900">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          controls={isPlaying}
          playsInline
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <button
            onClick={handlePlay}
            aria-label={`Play testimonial from ${name}`}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          >
            <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play size={26} className="text-primary-600 ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-primary-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
 
export default function TestimonialsPage() {
  return (
    <>
      {/* Small page intro */}
      <section className="bg-cream-50 pt-16 md:pt-20 pb-4">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                Testimonials
              </span>
            </div>
            <p className="text-lg text-gray-600">
              Real stories from students and parents who found clarity with
              DeepClariti.
            </p>
          </motion.div>
        </div>
      </section>
 
      {/* Video Testimonials — now first */}
      <section className="pt-8 pb-16 md:pb-24 bg-cream-50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                Hear It From Them
              </span>
            </div>
            <h2 className="section-heading">Video Testimonials</h2>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {videoTestimonials.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <VideoCard name={v.name} role={v.role} src={v.src} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Text Testimonials — now second */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-gold-500 inline-block" />
              <span className="text-sm font-semibold tracking-wide text-gold-600 uppercase">
                In Their Words
              </span>
            </div>
            <h2 className="section-heading">What People Say</h2>
          </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream-100 border border-primary-100 rounded-xl p-6 md:p-8 relative"
              >
                <Quote size={28} className="text-primary-200 absolute top-6 right-6" />
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-primary-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
 
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">Ready to write your own success story?</p>
            <Link href="/free-consultation">
              <Button size="lg">Book Free Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
 
"use client";

import Image from "next/image";

export function CoverBanner() {
  return (
    <section className="relative w-full">
      <Image
        src="/cover-photo.png"
        alt="Deep Clariti - Shaping Confident Careers"
        width={1920}
        height={480}
        className="w-full h-auto object-cover"
        priority
      />
    </section>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-padding bg-white min-h-[60vh] flex items-center">
      <div className="container-width text-center">
        <h1 className="text-8xl font-display font-bold text-primary-200 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg">Go to Homepage</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

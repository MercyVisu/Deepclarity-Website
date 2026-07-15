import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">
              Deep<span className="text-accent-300">Clariti</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Shaping Confident Careers. Personalized career coaching by
              V. Swaminathan — International Certified Career Coach (CDA, USA).
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/career-coaching", label: "Career Coaching" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/insights", label: "Insights" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For You */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For You</h4>
            <ul className="space-y-2">
              {[
                { href: "/students", label: "Students" },
                { href: "/parents", label: "Parents" },
                { href: "/book-session", label: "Book Session" },
                { href: "/free-consultation", label: "Free Consultation" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-accent-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@deepclariti.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-accent-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DeepClariti. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

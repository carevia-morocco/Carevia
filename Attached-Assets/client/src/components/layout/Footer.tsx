import { HeartPulse, Twitter, Instagram, Linkedin, Mail, Facebook } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                Care<span className="text-primary">Via</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              Providing compassionate, professional, and personalized in-home elderly care. We believe everyone deserves to age with dignity in the comfort of their own home.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/caregivers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find a Caregiver</Link></li>
              <li><Link href="/book" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                hello@carevia.app
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <HeartPulse className="w-4 h-4 text-primary" />
                1-800-CARE-VIA
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareVia Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactCTA: React.FC = () => {
  return (
    <section id="contact" className="bg-[#FDFBF7] py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Minimalist Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-xs border border-[#EAE6E1] p-8 md:p-12 lg:p-16 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          {/* Left: Heading & Subtitle */}
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#666666] block font-medium">
              Get in touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] font-normal leading-snug tracking-tight">
              Start a conversation about your next journey.
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans font-light leading-relaxed">
              We’ll help you find the route that fits.
            </p>
          </div>

          {/* Right: Contact details with click-to-email & click-to-call */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4 sm:gap-6">
            <a
              id="cta-contact-email"
              href="mailto:hello@beyondstrangers.travel"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-[#2C3E35] text-[#FDFBF7] hover:bg-[#3B5246] transition-colors text-sm font-sans font-medium cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4" />
              <span>hello@beyondstrangers.travel</span>
            </a>

            <a
              id="cta-contact-phone"
              href="tel:+919876543210"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm border border-[#EAE6E1] text-[#1A1A1A] hover:border-[#2C3E35] hover:text-[#2C3E35] bg-white transition-colors text-sm font-sans font-medium cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#2C3E35]" />
              <span>+91 98765 43210</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

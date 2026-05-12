import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Menu', href: '#menu' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
       <nav 
         className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 ${
           isScrolled ? 'bg-black/50 backdrop-blur-lg py-4' : 'bg-transparent py-6'
         }`}
         role="navigation"
         aria-label="Main navigation"
       >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" aria-label="ÌMÍLÈ Home">
            <span className="font-display font-black text-2xl tracking-[0.3em] text-white">
              ÌMÍLÈ
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-gold transition-colors relative group nav-link"
              >
                {link.name}
              </a>
            ))}
            <a href="#reservations" className="pill-btn ml-4">
              Book Table
            </a>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col p-8"
            role="dialog"
            aria-label="Mobile menu"
          >
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-gold"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-display font-light flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronRight className="text-gold opacity-0 group-hover:opacity-100 transition-all" aria-hidden="true" />
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 py-4 w-full rounded-full border border-gold/30 text-[12px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-500"
              >
                Book Your Table
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
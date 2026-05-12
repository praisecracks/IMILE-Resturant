import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeImage, FALLBACK_IMAGES } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

const categories = ["Small Chops", "The Main Sequence", "Lagos Sweets", "Palm Alchemy"];

const menuItems = {
  "Small Chops": [
    { name: "Suya Carpaccio", price: "$45", desc: "Thinly sliced wagyu beef, smoked yaji, micro-greens, peanut dust", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=2669" },
    { name: "Lobster Moin-Moin", price: "$52", desc: "Puchased honey beans, lobster essence, charcoal-grilled prawns", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2670" },
  ],
  "The Main Sequence": [
    { name: "Gold Leaf Jollof", price: "$120", desc: "Smokey long-grain rice, truffle oil, 24k gold leaf, braised short rib", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=2670" },
    { name: "Egusi Deconstructed", price: "$85", desc: "Melon seed foam, wild spinach textures, slow-roasted croaker fish", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2670" },
  ],
  "Lagos Sweets": [
    { name: "Nitro Puff-Puff", price: "$35", desc: "Liquid nitrogen dough, aged hibiscus glaze, white chocolate ash", img: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=2670" },
    { name: "Yam & Honey Galette", price: "$28", desc: "Sweet yam textures, Lagos honey, wild berries, scorched cream", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=2670" },
  ],
  "Palm Alchemy": [
    { name: "Eko Night", price: "$22", desc: "Dark rum, activated charcoal, pineapple reduction, chili spark", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=2670" },
    { name: "Palm Wine Spritz", price: "$25", desc: "Artisanal palm wine, gold leaf essence, carbonated ginger", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2670" },
  ]
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [showFullList, setShowFullList] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + Escape key + focus management
  useEffect(() => {
    if (showFullList) {
      document.body.style.overflow = 'hidden';
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) lenisInstance.stop();
      
      // Focus close button for accessibility
      setTimeout(() => panelCloseBtnRef.current?.focus(), 100);
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowFullList(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) lenisInstance.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFullList]);

  // Heading character animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-heading .split-char", {
        y: 80,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 3D tilt handlers for menu cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section id="menu" ref={sectionRef} className="py-32 px-6 md:px-12 bg-graphite relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="menu-heading text-5xl md:text-7xl font-display font-light mb-6">
                {['C','U','R','A','T','E','D'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
                <br />
                <span className="text-gold font-serif italic">
                  {['F','L','A','V','O','R','S'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
                </span>
              </h2>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">Selected masterpieces for the discerning</p>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all duration-500 ${
                    activeTab === cat ? 'border-gold text-white' : 'border-transparent text-white/30 hover:text-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            {(menuItems as any)[activeTab].map((item: any, i: number) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-8 p-8 rounded-3xl glass hover:bg-white/5 transition-colors relative overflow-hidden"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden shrink-0">
                  <SafeImage
                    src={item.img}
                    alt={item.name}
                    fallback={FALLBACK_IMAGES.menu}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold group-hover:text-gold transition-colors">{item.name}</h3>
                    <span className="text-gold font-serif italic text-lg">{item.price}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  <div className="mt-4 flex gap-1">
                    {[1,2,3].map(j => <div key={j} className="w-1 h-1 rounded-full bg-gold/20 group-hover:bg-gold/60 transition-colors" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 text-center">
            <button
              onClick={() => setShowFullList(true)}
              className="px-12 py-5 rounded-full border border-gold/30 text-xs uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all duration-700 glow-amber group"
            >
              View Full Alchemy List
            </button>
        </div>
      </div>

      {/* Full Alchemy List - Slide-Up Panel */}
      <AnimatePresence>
        {showFullList && (
          <>
            {/* Slide-Up Panel - Entire panel is scroll container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed left-0 right-0 bottom-0 z-50 h-[90vh] bg-graphite/95 backdrop-blur-xl border-t border-gold/20 rounded-t-[2rem] shadow-2xl overflow-y-auto touch-pan-y"
              role="dialog"
              aria-modal="true"
              aria-label="Full alchemy list"
              tabIndex={-1}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
               {/* Sticky top: Drag handle + Header */}
               <div className="sticky top-0 z-20 bg-graphite/95 backdrop-blur-md px-8 md:px-16 pt-4 pb-2 border-b border-gold/40 shadow-[0_1px_0_0_rgba(217,140,69,0.4)] -mb-px">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-1.5 rounded-full bg-gold/40 cursor-grab active:cursor-grabbing" onClick={() => setShowFullList(false)} />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl md:text-4xl font-display font-light">
                    THE <span className="text-gold italic font-serif">ALCHEMY</span>
                  </h2>
                  <button
                    ref={panelCloseBtnRef}
                    onClick={() => setShowFullList(false)}
                    className="text-white/40 hover:text-gold transition-colors text-2xl p-2 hover:bg-white/5 rounded-full"
                    aria-label="Close alchemy list"
                  >
                    ×
                  </button>
                </div>
                <p className="text-white/30 text-xs uppercase tracking-[0.3em] mt-2">All creations — small chops to palm elixirs</p>
              </div>

              {/* Content scrolls under sticky header */}
              <div className="px-8 md:px-16 py-8 pb-24 space-y-10 md:space-y-12">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-lg uppercase tracking-[0.3em] text-gold mb-6 border-b border-gold/10 pb-2 flex items-center gap-3">
                      <span className="w-1 h-4 bg-gold/50 rounded-full" />
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {menuItems[category as keyof typeof menuItems].map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-gold/20 rounded-2xl p-4 md:p-5 group transition-all duration-500"
                        >
                          <div className="flex gap-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 group-hover:border-gold/30 transition-colors">
                              <SafeImage
                                src={item.img}
                                alt={item.name}
                                fallback={FALLBACK_IMAGES.menu}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                              <div>
                                <h4 className="font-display font-bold text-sm md:text-base group-hover:text-gold transition-colors truncate">
                                  {item.name}
                                </h4>
                                <p className="text-white/40 text-xs md:text-sm mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex gap-1">
                                  {[1,2,3].map(j => <div key={j} className="w-1 h-1 rounded-full bg-gold/20 group-hover:bg-gold/60 transition-colors" />)}
                                </div>
                                <span className="text-gold font-serif italic text-sm md:text-base">
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky bottom close */}
              <div className="sticky bottom-0 z-10 bg-graphite/95 backdrop-blur-md border-t border-gold/10 py-6 text-center">
                <button
                  onClick={() => setShowFullList(false)}
                  className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors"
                >
                  Close with a click ×
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
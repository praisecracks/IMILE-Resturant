import { useRef, useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, UtensilsCrossed, Wine, Zap } from 'lucide-react';
import { SafeImage, FALLBACK_IMAGES } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Afro-Molecular",
    desc: "Reimagining Nigerian foundations through quantum chemistry. Spherified palm wine, air-dried asun crystals, and botanical mists.",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2670"
  },
  {
    icon: <Wine className="w-8 h-8" />,
    title: "Oba's Cellar",
    desc: "A curation of rare African ferments and international reserves, served in hand-carved obsidian vessels.",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=2670"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Eko Skyline",
    desc: "Dine amidst the clouds of Victoria Island. Immersive rooftop views synced to a live Afro-electronic sonic landscape.",
    img: "https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&q=80&w=2670"
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: "The Atelier",
    desc: "Witness the craft up close. Our chefs engage in live culinary storytelling, bridging the gap between root and plate.",
    img: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=2670"
  }
];

export default function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tilt card handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
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

   useEffect(() => {
     const ctx = gsap.context(() => {
       const items = gsap.utils.toArray('.exp-card');
       items.forEach((item: any, i) => {
         gsap.from(item, {
           y: 100,
           opacity: 0,
           duration: 1.2,
           ease: 'power3.out',
           scrollTrigger: {
             trigger: item,
             start: 'top bottom-=100',
             toggleActions: 'play none none reverse',
           }
         });
       });

       // Heading character split animation
       gsap.from(".split-title .split-char", {
         y: 50,
         opacity: 0,
         stagger: 0.03,
         duration: 1,
         ease: "power3.out",
         scrollTrigger: {
           trigger: scrollRef.current,
           start: "top 70%",
         }
       });
     }, scrollRef);

     return () => ctx.revert();
   }, []);

  return (
    <section id="experience" ref={scrollRef} className="py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]" />
      
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="split-title text-5xl md:text-7xl font-display font-light mb-6">
              {['T','H','E'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
              {' '}
              <span className="text-gold italic font-serif">
                {['Ì','M','Í','L','È'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
              </span>
              <br />
              {['P','H','I','L','O','S','O','P','H','Y'].map((c,i) => (
                <span key={`phi-${i}`} className="split-char">{c}</span>
              ))}
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Elevating the Nigerian culinary narrative to a global zenith. We fuse high-society Lagos luxury with the avant-garde spirit of future Africa.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">SCROLL TO DISCOVER</span>
            <div className="w-32 h-[1px] bg-gold/30 ml-auto mt-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: '1000px' }}>
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="exp-card group relative h-[500px] overflow-hidden rounded-[2rem] border border-white/5"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <SafeImage
                src={exp.img}
                alt={exp.title}
                fallback={FALLBACK_IMAGES.experience}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 translate-y-0 translate-z-0">
                <div className="text-gold mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {exp.icon}
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {exp.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                  {exp.desc}
                </p>
                <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span>Explore Detail</span>
                  <div className="w-12 h-[1px] bg-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
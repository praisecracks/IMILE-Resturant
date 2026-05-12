import { useRef, useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { SafeImage, FALLBACK_IMAGES } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Split subtitle into words for animation
  const subtitleWords = "Embark on a multi-sensory journey through the soul of Lagos. Where ancestral flavors meet the precision of tomorrow's luxury.".split(' ');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(spotlightRef.current, {
      "--x": `${x}px`,
      "--y": `${y}px`,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title character reveal
      gsap.from(".split-char", {
        y: "100%",
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5,
      });

      // Hero subtitle word reveal
      gsap.from(".split-word", {
        y: 30,
        opacity: 0,
        stagger: 0.04,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      });

      gsap.to(bgRef.current, {
        yPercent: 30,
        scale: 1.15,
        rotation: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-black"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <SafeImage
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2670"
          alt="Luxury Glassware - ÌMÍLÈ dining experience"
          fallback={FALLBACK_IMAGES.hero}
          className="w-full h-full object-cover opacity-60 scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Mouse spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          '--x': '50%',
          '--y': '50%',
          background: 'radial-gradient(circle 500px at var(--x) var(--y), rgba(217,140,69,0.15), transparent 40%)',
          mixBlendMode: 'overlay'
        } as React.CSSProperties}
      />

      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 overflow-visible z-30">
        <div className="flex flex-col gap-8 items-center text-[10px] uppercase tracking-[0.4em] text-gold/40 [writing-mode:vertical-rl]">
           <span>6.4253° N, 3.4419° E</span>
           <span className="w-[1px] h-20 bg-gold/20 my-4" />
           <span>Michelin Selection 2042</span>
           <span className="w-[1px] h-20 bg-gold/20 my-4" />
           <span>Lagos • Victoria Island</span>
        </div>
      </div>

      <div className="relative z-20 text-left px-6 md:px-24 w-full max-w-screen-2xl">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-[140px] lg:text-[160px] leading-[0.8] font-black tracking-[-0.05em]"
        >
          {['À','S','À'].map((char, i) => (
            <span key={i} className="split-char">{char}</span>
          ))}
          <br />
          <span className="text-gold italic font-serif lowercase tracking-normal text-[0.4em] md:text-[0.3em] block mt-4">heritage reborn</span>
          {['T','Ò','N','Í'].map((char, i) => (
            <span key={`bottom-${i}`} className="split-char">{char}</span>
          ))}
        </h1>
        
        <p ref={subRef} className="max-w-md mt-10 text-lg md:text-xl text-white/70 font-light leading-relaxed">
          {subtitleWords.map((word, i) => (
            <span key={i} className="split-word">{word}{i < subtitleWords.length - 1 ? ' ' : ''}</span>
          ))}
        </p>

        <div className="flex items-center gap-8 mt-12">
          <a href="#reservations" className="pill-btn">
            Reserve Now
          </a>
          <a
            href="#experience"
            className="group flex items-center gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
              <ChevronDown size={14} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">The Experience</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-t from-white to-transparent" />
        <ChevronDown size={16} />
      </div>

      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full border border-white/10 glass animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full border border-gold/5 glass-dark" />
    </section>
  );
}
import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'expo.out',
        delay: 0.5,
      });

      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.2,
      });

      gsap.to(bgRef.current, {
        yPercent: 30,
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
          ÀSÀ<br />
          <span className="text-gold italic font-serif lowercase tracking-normal text-[0.4em] md:text-[0.3em] block mt-4">heritage reborn</span>
          TÒNÍ
        </h1>
        
        <p ref={subRef} className="max-w-md mt-10 text-lg md:text-xl text-white/70 font-light leading-relaxed">
          Embark on a multi-sensory journey through the soul of Lagos. Where ancestral flavors meet the precision of tomorrow's luxury.
        </p>

        <div className="flex items-center gap-8 mt-12">
          <a href="#reservations" className="pill-btn">
            Reserve Now
          </a>
          <div className="group flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
               <ChevronDown size={14} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">The Experience</span>
          </div>
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
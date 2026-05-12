import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeImage, FALLBACK_IMAGES } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: -100,
        scale: 1.1,
        rotation: -0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.from('.about-text-line', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      });

      // Heading character split animation
      gsap.from(".split-title .split-char", {
        y: "100%",
        opacity: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-44 relative bg-black overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div ref={imgRef} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10" />
          <SafeImage
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2670"
            alt="Futuristic Kitchen at ÌMÍLÈ"
            fallback={FALLBACK_IMAGES.experience}
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-10 left-10 z-20 glass p-8 rounded-2xl max-w-xs scale-0 animate-[scaleIn_1s_ease-out_forwards]">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-2">Our Manifesto</p>
            <p className="text-xs leading-relaxed text-white/80">Every creation is a dialogue between technology and taste, a rebellion against the ordinary.</p>
          </div>
        </div>

          <div ref={textRef}>
            <p className="about-text-line text-xs uppercase tracking-[0.5em] text-gold mb-8 inline-block border-b border-gold/30 pb-2">The Digital Ancestry</p>
            <h2 className="split-title text-5xl md:text-8xl font-display font-light mb-12 leading-[0.95]">
              {['F','R','O','M'].map((c,i) => <span key={`from-${i}`} className="split-char">{c}</span>)}
              {' '}
              <span className="text-gold italic font-serif">
                {['À','R','È','W','À'].map((c,i) => <span key={`arewa-${i}`} className="split-char">{c}</span>)}
              </span>
              {' '}
              {['T','O'].map((c,i) => <span key={`to-${i}`} className="split-char">{c}</span>)}
              {' '}
              {['A','T','E','L','I','E','R'].map((c,i) => <span key={`atelier-${i}`} className="split-char">{c}</span>)}
            </h2>
          <div className="space-y-6 text-white/60 text-xl font-light leading-relaxed max-w-xl">
             <p className="about-text-line">ÌMÍLÈ is a tribute to the eternal radiance of West African heritage. We don't just serve food; we archive culture through crystals, foam, and fire.</p>
             <p className="about-text-line">Born on the rooftops of Victoria Island, our mission is to translate the rhythmic heartbeat of Lagos into a language of luxury. Every plate is a quantum leap into the future of African dining.</p>
          </div>
          
          <button className="about-text-line mt-12 group flex items-center gap-6">
            <span className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-500">
              →
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold group-hover:text-gold transition-colors">Our Legacy</span>
          </button>
        </div>
      </div>

      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </section>
  );
}
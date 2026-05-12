import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeImage, FALLBACK_IMAGES } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000"
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
     const ctx = gsap.context(() => {
       const horizontalSection = sectionRef.current;
       if (!horizontalSection) return;

       const totalWidth = horizontalSection.scrollWidth;
       const amountToScroll = totalWidth - window.innerWidth;

       const horizontalTween = gsap.to(horizontalSection, {
         x: -amountToScroll,
         ease: 'none',
         scrollTrigger: {
           trigger: triggerRef.current,
           start: 'top top',
           end: `+=${amountToScroll}`,
           pin: true,
           scrub: 1.5,
           invalidateOnRefresh: true,
         }
       });

       // Card-level parallax (scale + rotationY)
       const cards = horizontalSection.querySelectorAll('.gallery-card');
       cards.forEach((card) => {
         gsap.from(card, {
           scale: 0.85,
           rotationY: 3,
           opacity: 0.7,
           transformPerspective: 1000,
           scrollTrigger: {
             trigger: card,
             containerAnimation: horizontalTween,
             start: "right right",
             end: "left left",
             scrub: true,
           }
         });
       });

       // Heading character animation
       gsap.from(".gallery-heading .split-char", {
         y: 60,
         opacity: 0,
         stagger: 0.04,
         duration: 1.2,
         ease: "power3.out",
         scrollTrigger: {
           trigger: triggerRef.current,
           start: "top 70%",
         }
       });
     }, triggerRef);

     return () => ctx.revert();
   }, []);

  return (
    <section id="gallery" ref={triggerRef} className="bg-black relative">
      <div className="h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-12 mb-12 max-w-screen-2xl mx-auto w-full">
          <h2 className="gallery-heading text-4xl md:text-6xl font-display font-light">
            {['V','I','S','U','A','L'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
            {' '}
            <span className="text-gold italic font-serif">
              {['J','O','U','R','N','E','Y'].map((c,i) => <span key={i} className="split-char">{c}</span>)}
            </span>
          </h2>
          <div className="w-24 h-[2px] bg-gold mt-6" />
        </div>

        <div ref={sectionRef} className="flex gap-8 px-12 w-fit">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="gallery-card w-[300px] md:w-[600px] aspect-[16/10] shrink-0 rounded-[2rem] overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
              <SafeImage
                src={img}
                alt={`Gallery item ${i + 1}`}
                fallback={FALLBACK_IMAGES.gallery}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                 <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white">Perspective 0{i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
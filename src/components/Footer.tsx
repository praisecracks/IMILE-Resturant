import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black pt-44 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-line">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/10 blur-[150px] rounded-full -z-0" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-32">
          <div className="sm:col-span-2">
            <h2 className="text-6xl md:text-9xl font-display font-black tracking-[0.3em] mb-12 opacity-5 blur-sm select-none">ÌMÍLÈ</h2>
            <p className="text-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-xl">
              Elevating the soul of Lagos. A fusion of heritage and high-tech luxury hospitality.
            </p>
            <div className="flex gap-6 mt-12">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-500" rel="noopener noreferrer" aria-label="Social media link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] font-bold text-[10px] mb-6">Connect</p>
              <div className="space-y-4">
                <a href="mailto:eko@imile.luxury" className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors font-light text-sm">
                  <Mail size={14} className="text-gold/50" aria-hidden="true" />
                  eko@imile.luxury
                </a>
                <a href="tel:+2348123456789" className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors font-light text-sm">
                  <Phone size={14} className="text-gold/50" aria-hidden="true" />
                  +234 812 345 6789
                </a>
              </div>
            </div>
            
            <div>
              <p className="text-gold uppercase tracking-[0.3em] font-bold text-[10px] mb-6">The Zenith</p>
              <address className="not-italic text-white/70 font-light leading-relaxed text-sm">
                <div className="flex items-center gap-4">
                   <MapPin size={14} className="text-gold/50" aria-hidden="true" />
                   <span>The Obsidian Heights, Tower 4<br />Victoria Island, Lagos</span>
                </div>
              </address>
            </div>
          </div>

          <div>
             <p className="text-gold uppercase tracking-[0.3em] font-bold text-[10px] mb-6">Timeline</p>
             <ul className="space-y-3 text-white/50 font-light text-sm">
               <li className="flex justify-between"><span>Nightly</span> <span className="text-white">18:00 - 02:00</span></li>
               <li className="flex justify-between"><span>Lagos After-Dark</span> <span className="text-white">23:00 - 05:00</span></li>
               <li className="flex justify-between"><span>Monday</span> <span className="text-gold italic">Recalibration</span></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-line gap-6">
           <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] text-center md:text-left">© 2025 ÌMÍLÈ HOSPITALITY GROUP — LAGOS • LONDON • DUBAI</p>
           <div className="flex gap-8">
             {['Privacy', 'Legal', 'Careers'].map(link => (
               <a key={link} href="#" className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-gold transition-colors" rel="noopener noreferrer">{link}</a>
             ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
import { useRef, useState } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Clock, ShieldCheck, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    guestName: '',
    contactPhone: '',
    reservationDate: '',
    reservationTime: '',
    partySize: '',
    atmosphere: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <section id="reservations" ref={sectionRef} className="py-44 relative bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center mx-auto mb-8">
              <Check size={40} className="text-black" />
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-light mb-6">
              RESERVATION <br />
              <span className="text-gold italic font-serif">CONFIRMED</span>
            </h2>
            <p className="text-white/60 text-lg font-light max-w-lg mx-auto mb-12">
              Your passage to the ìmọ́lẹ̀ experience has been secured. A concierge will contact you within 24 hours to confirm details.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="pill-btn"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservations" ref={sectionRef} className="py-44 relative bg-black overflow-hidden" aria-labelledby="reservation-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(217,140,69,0.08)_0%,_transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <p className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-8">Secure Your Passage</p>
          <h2 id="reservation-heading" className="text-5xl md:text-8xl font-display font-light leading-[0.9]">
            BECKON THE <br />
            <span className="text-gold italic font-serif">ZENITH</span>
          </h2>
          <p className="max-w-lg mx-auto text-white/40 text-lg font-light leading-relaxed mt-12">
            Each seating is a choreographed sequence. Attendance is strictly curated to maintain the sanctity of the experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-12 glass p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -z-10" />

            <form className="grid grid-cols-1 md:grid-cols-2 gap-10" aria-label="Reservation form" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="guest-name" className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4">Guest Identity</label>
                <input
                  id="guest-name"
                  name="guestName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-light placeholder:text-white/20 text-sm"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="contact-phone" className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4">Contact Number</label>
                <input
                  id="contact-phone"
                  name="contactPhone"
                  type="tel"
                  placeholder="+234 812 345 6789"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-light placeholder:text-white/20 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-2">
                <div className="space-y-3">
                  <label htmlFor="reservation-date" className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4 flex items-center gap-2">
                    <Calendar size={10} className="text-gold" /> Timeline
                  </label>
                  <input
                    id="reservation-date"
                    name="reservationDate"
                    type="date"
                    value={formData.reservationDate}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-light text-white/70 text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="reservation-time" className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4 flex items-center gap-2">
                    <Clock size={10} className="text-gold" /> Preferred Hour
                  </label>
                  <select
                    id="reservation-time"
                    name="reservationTime"
                    value={formData.reservationTime}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-light text-white/70 text-sm appearance-none"
                  >
                    <option value="">Select hour</option>
                    <option>19:00 — Sunset Sequence</option>
                    <option>20:30 — Prime Alchemy</option>
                    <option>22:00 — Midnight Drift</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label htmlFor="party-size" className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4 flex items-center gap-2">
                    <Users size={10} className="text-gold" /> Party Size
                  </label>
                  <select
                    id="party-size"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all font-light text-white/70 text-sm appearance-none"
                  >
                    <option value="">Select party size</option>
                    <option>02 Members</option>
                    <option>04 Members</option>
                    <option>06 Members</option>
                    <option>Private Vault (12+)</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4">Atmosphere Selection</p>
                <div className="flex flex-wrap gap-4" role="radiogroup" aria-label="Seating area selection">
                  {['Skyline Terrace', 'The Obsidian Vault', 'Atelier Seating'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={formData.atmosphere === opt}
                      onClick={() => setFormData({...formData, atmosphere: opt})}
                      className={`px-8 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:border-gold hover:text-gold transition-all duration-500 ${
                        formData.atmosphere === opt ? 'border-gold bg-gold/10' : 'bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4 text-white/40">
                  <ShieldCheck size={20} className="text-gold" aria-hidden="true" />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium max-w-xs leading-relaxed">Your data is encrypted. Selection is at the discretion of the concierge.</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`pill-btn px-20 py-8 md:text-sm glow-gold w-full md:w-auto ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  aria-label="Initiate reservation request"
                >
                  {isSubmitting ? 'PROCESSING...' : 'INITIATE RESERVATION'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_15px_#D98C45]" aria-hidden="true" />
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">System Active: 4 slots remaining for the current cycle</p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { BakeryArtwork } from './BakeryArtwork';
import { Check, Star, ArrowRight, ShieldCheck, Sparkles, Gift } from 'lucide-react';

interface HeroProps {
  onBuildBoxClick: () => void;
  onExploreBakes: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBuildBoxClick,
  onExploreBakes,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EE] to-[#F3EDE2] border-b border-[#E8DFC8] pt-10 pb-16 lg:pt-14 lg:pb-22">
      {/* Ambient Levain Bakery Blue & Cookie Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5D9FC]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8DFC8]/60 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Indulgent Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag / Category Kicker in Levain Signature Royal Blue */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
              <Sparkles size={13} />
              <span>World-Famous NYC Giant 6-oz Cookies</span>
            </div>

            {/* Levain's iconic signature phrase */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#0A1C38] leading-[1.08] tracking-tight">
              Crispy outside. Molten gooey inside.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#4A5D78] leading-relaxed max-w-2xl font-normal">
              Freshly baked in our ovens each morning and shipped nationwide in our signature deep navy gift tins hand-tied with cornflower blue satin ribbons.
            </p>

            {/* Trust Checklist with Levain Blue Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0A1C38]">
                <div className="w-5 h-5 rounded-full bg-[#E8F0FE] text-[#0047FF] flex items-center justify-center shrink-0">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Legendary 6-Ounce Giant Cookies</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0A1C38]">
                <div className="w-5 h-5 rounded-full bg-[#E8F0FE] text-[#0047FF] flex items-center justify-center shrink-0">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>100% Real Creamery Pasture Butter</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0A1C38]">
                <div className="w-5 h-5 rounded-full bg-[#E8F0FE] text-[#0047FF] flex items-center justify-center shrink-0">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Signature Blue Ribbon Gift Boxes</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0A1C38]">
                <div className="w-5 h-5 rounded-full bg-[#E8F0FE] text-[#0047FF] flex items-center justify-center shrink-0">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span>Nationwide Shipping via FedEx Express</span>
              </div>
            </div>

            {/* Primary Action Buttons in Levain Royal Blue */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onBuildBoxClick}
                className="px-8 py-4 text-sm font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 uppercase tracking-wider cursor-pointer"
              >
                <span>Build a Cookie Box</span>
                <ArrowRight size={16} className="text-[#FFE27D]" />
              </button>

              <button
                onClick={onExploreBakes}
                className="px-6 py-4 text-sm font-bold text-[#0A1C38] bg-white hover:bg-[#E8F0FE] border-2 border-[#0A1C38] rounded-full shadow-2xs transition-all cursor-pointer"
              >
                Shop All Treats & Tins
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 border-t border-[#E8DFC8] flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-[#DF9A3E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <div className="text-xs text-[#556984]">
                <strong className="text-[#0A1C38]">4.9 / 5 Stars</strong> based on 42,000+ happy cookie lovers
              </div>
            </div>

          </div>

          {/* Right Column: Signature Levain Cookie & Navy Tin Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E5DCC8] shadow-2xl">
              
              {/* Badge */}
              <div className="absolute -top-3.5 left-8 bg-[#0047FF] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                Baking Fresh Daily Since 1995
              </div>

              {/* Cookie Artwork Lead */}
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#FAF6EE] mb-6">
                <BakeryArtwork type="chocolate-chip-walnut" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0047FF]">
                    The Original NYC Legend
                  </span>
                  <span className="text-sm font-bold text-[#0A1C38] font-mono">
                    6 oz (170g)
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#0A1C38]">
                  Chocolate Chip Walnut Cookie
                </h3>
                <p className="text-xs text-[#556984] leading-relaxed">
                  A gigantic 6-ounce mound with a crispy, craggy shell and a molten pool of semi-sweet chocolate and toasted California walnuts.
                </p>

                <div className="pt-3 border-t border-[#E8DFC8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A8EAA] uppercase font-bold block">Warm Cookie Ritual</span>
                    <span className="text-xs font-bold text-[#0A1C38]">5 Mins at 350°F</span>
                  </div>
                  <button
                    onClick={onBuildBoxClick}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] rounded-full uppercase tracking-wider transition-all"
                  >
                    Add to Box
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

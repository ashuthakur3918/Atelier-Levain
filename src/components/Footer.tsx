import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#071326] text-white pt-16 pb-12 border-t border-[#122646]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Cookie Club Hook in Levain Style */}
        <div className="bg-[#0A1C38] rounded-3xl p-8 sm:p-10 border border-[#1A3158] mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4E8CF6]">
              <Sparkles size={13} className="text-[#0047FF]" />
              <span>Join The Levain Bakery Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Get 15% off your first cookie box.
            </h3>
            <p className="text-xs sm:text-sm text-[#A6C4EE] leading-relaxed">
              Plus early access to limited seasonal cookie drops, holiday gift tins, and private bakery events.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="px-6 py-3.5 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold flex items-center gap-2">
                <Check size={16} />
                <span>You’re on the VIP list! Use code LEVAIN15 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full sm:w-96">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-[#071326] text-white text-xs rounded-full border border-[#213C68] focus:outline-none focus:border-[#0047FF] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0047FF] hover:bg-[#0038CC] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                >
                  <span>Join Club</span>
                  <ArrowRight size={13} className="text-[#FFE27D]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Levain Bakery Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#162E56]">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <span>Atelier Levain</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0047FF]" />
            </a>
            <p className="text-xs text-[#8A9EBA] leading-relaxed max-w-sm">
              World-famous giant 6-ounce cookies and stone-hearth slow-fermented breads. Baked fresh with 100% pasture creamery butter and shipped nationwide in signature deep navy gift boxes.
            </p>
            <div className="text-xs text-[#6A7E99] space-y-1">
              <div className="flex items-center gap-1.5 text-[#A6C4EE]">
                <MapPin size={13} className="text-[#0047FF]" />
                <span>Original Bakery: 167 West 74th St, Upper West Side, NYC</span>
              </div>
              <div>Flagships in New York · Washington DC · Boston · Chicago · Los Angeles</div>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4E8CF6]">
              Shop Bakery
            </div>
            <ul className="space-y-2 text-xs text-[#A6C4EE]">
              <li><a href="#build-a-box" className="hover:text-white transition-colors">Build Custom Box</a></li>
              <li><a href="#products-section" className="hover:text-white transition-colors">Chocolate Chip Walnut</a></li>
              <li><a href="#products-section" className="hover:text-white transition-colors">Two Chip Chocolate</a></li>
              <li><a href="#products-section" className="hover:text-white transition-colors">Dark Chocolate PB</a></li>
              <li><a href="#products-section" className="hover:text-white transition-colors">Birthday Cake Cookie</a></li>
            </ul>
          </div>

          {/* Column 2: Gifting & Subscriptions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4E8CF6]">
              Gifting & Club
            </div>
            <ul className="space-y-2 text-xs text-[#A6C4EE]">
              <li><a href="#build-a-box" className="hover:text-white transition-colors">8-Pack Signature Box</a></li>
              <li><a href="#build-a-box" className="hover:text-white transition-colors">12-Pack Party Tin</a></li>
              <li><a href="#plans-section" className="hover:text-white transition-colors">Monthly Cookie Club</a></li>
              <li><a href="#products-section" className="hover:text-white transition-colors">Corporate Gifting</a></li>
              <li><a href="#reheat-guide" className="hover:text-white transition-colors">The Warm Cookie Ritual</a></li>
            </ul>
          </div>

          {/* Column 3: The Bakery */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#4E8CF6]">
              About Us
            </div>
            <ul className="space-y-2 text-xs text-[#A6C4EE]">
              <li><a href="#comparison-section" className="hover:text-white transition-colors">Our Baking Standard</a></li>
              <li><a href="#reviews-section" className="hover:text-white transition-colors">Reviews (42,000+)</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Shipping & FAQ</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Allergen Safety</a></li>
              <li><a href="#reheat-guide" className="hover:text-white transition-colors">Freezer & Care Tips</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Certifications */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#556984]">
          <div>
            © {new Date().getFullYear()} Atelier Levain LLC. Hand-baked in NYC & shipped fresh nationwide.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>100% Real Creamery Butter</span>
            <span aria-hidden="true">·</span>
            <span>Zero Preservatives</span>
            <span aria-hidden="true">·</span>
            <span>FedEx 2-Day Express</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

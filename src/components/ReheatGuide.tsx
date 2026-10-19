import React from 'react';
import { Flame, Clock, Sparkles, Snowflake, Heart } from 'lucide-react';

export const ReheatGuide: React.FC = () => {
  return (
    <section className="py-16 bg-[#0A1C38] text-white border-b border-[#162E56]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#122646] text-[#4E8CF6] rounded-full text-xs font-bold uppercase tracking-wider border border-[#213C68]">
            <Sparkles size={13} className="text-[#0047FF]" />
            <span>The Levain Bakery Warm Cookie Ritual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            How to Get That Fresh-From-The-Oven Molten Center
          </h2>
          <p className="text-sm text-[#A6C4EE] leading-relaxed">
            Our 6-ounce cookies are engineered for the ultimate contrast: crispy on the outside, dense and molten on the inside. Follow our simple oven ritual at home.
          </p>
        </div>

        {/* 4 Ritual Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[#0E2345] p-6 rounded-2xl border border-[#213C68] space-y-3 relative hover:border-[#0047FF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white font-bold flex items-center justify-center text-xs shadow-md">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Preheat Oven to 350°F</h3>
            <p className="text-xs text-[#A6C4EE] leading-relaxed">
              Set your home oven or toaster oven to 350°F (175°C). Avoid microwaving whenever possible to preserve that crispy exterior crust!
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0E2345] p-6 rounded-2xl border border-[#213C68] space-y-3 relative hover:border-[#0047FF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white font-bold flex items-center justify-center text-xs shadow-md">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Warm for 4 to 5 Minutes</h3>
            <p className="text-xs text-[#A6C4EE] leading-relaxed">
              Place cookies directly onto a baking sheet. Heat until you smell the toasted butter and melting pools of chocolate.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0E2345] p-6 rounded-2xl border border-[#213C68] space-y-3 relative hover:border-[#0047FF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white font-bold flex items-center justify-center text-xs shadow-md">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Rest for 60 Seconds</h3>
            <p className="text-xs text-[#A6C4EE] leading-relaxed">
              Let the cookie sit for one minute on the counter. The outer crags recrisp immediately while the center stays steaming and molten.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#0E2345] p-6 rounded-2xl border border-[#213C68] space-y-3 relative hover:border-[#0047FF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white font-bold flex items-center justify-center text-xs shadow-md">
              4
            </div>
            <h3 className="font-serif font-bold text-lg text-white">The Signature Pull Apart</h3>
            <p className="text-xs text-[#A6C4EE] leading-relaxed">
              Break the cookie open with two hands. Watch the chocolate lava flow, take your first bite, and enjoy pure New York bliss!
            </p>
          </div>

        </div>

        {/* Freezing callout */}
        <div className="mt-8 p-4 bg-[#0E2345] rounded-2xl border border-[#213C68] flex items-center justify-between flex-wrap gap-4 text-xs text-[#A6C4EE]">
          <div className="flex items-center gap-2">
            <Snowflake size={18} className="text-[#4E8CF6]" />
            <span><strong>Freezer Friendly:</strong> Freeze cookies in an airtight container for up to 6 months. Warm directly from frozen at 350°F for 8–10 minutes.</span>
          </div>
          <span className="text-[#FFE27D] font-bold">100% Satisfaction Guaranteed</span>
        </div>

      </div>
    </section>
  );
};

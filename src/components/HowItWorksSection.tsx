import React from 'react';
import { Sparkles, Utensils, Flame, Truck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartQuiz: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({
  onStartQuiz,
}) => {
  return (
    <section id="how-it-works" className="py-20 bg-[#F7F4EE] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EB] text-[#E05A2B] rounded-full text-xs font-bold uppercase tracking-wider border border-[#FCD9CC]">
            <Sparkles size={13} />
            <span>Effortless Doorstep Routine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1E1E1E] tracking-tight">
            How Atelier Levain Works
          </h2>
          <p className="text-base text-[#666] leading-relaxed">
            Fresh artisan bread without early morning bakery queues. Customized for your household and delivered on your terms.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E0D8CA] relative shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-[#E05A2B] text-white font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <Utensils size={24} className="text-[#E05A2B]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">
                Personalize Your Routine
              </h3>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                Take the 30-second quiz to choose your bread variety, pastry favorites, and precision slicing thickness (12mm daily, 18mm thick, or whole).
              </p>
            </div>
            <div className="pt-4 border-t border-[#F2ECE1] text-xs font-semibold text-[#E05A2B]">
              Customizable each delivery →
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E0D8CA] relative shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-[#E05A2B] text-white font-bold flex items-center justify-center text-sm">
                  2
                </span>
                <Flame size={24} className="text-[#E05A2B]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">
                Baked to Order Before Dawn
              </h3>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                Our bakers ferment dough for 36 hours and bake on radiant granite decks early the morning of dispatch. No shortcuts, no commercial additives.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F2ECE1] text-xs font-semibold text-[#E05A2B]">
              100% Certified Organic Grains →
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E0D8CA] relative shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-[#E05A2B] text-white font-bold flex items-center justify-center text-sm">
                  3
                </span>
                <Truck size={24} className="text-[#E05A2B]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">
                Delivered Insulated to Your Door
              </h3>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                Arrives on your front porch in curbside-recyclable craft insulated boxes. Enjoy fresh slices for breakfast, or pop extra loaves into the freezer.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F2ECE1] text-xs font-semibold text-[#E05A2B]">
              Pause, skip, or cancel anytime →
            </div>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 text-xs font-bold text-white bg-[#E05A2B] hover:bg-[#C94D22] active:scale-[0.99] rounded-full shadow-md uppercase tracking-wider inline-flex items-center gap-2 transition-all"
          >
            <span>Build Your Personalized Plan</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
};

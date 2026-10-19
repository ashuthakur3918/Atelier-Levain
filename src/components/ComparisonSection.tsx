import React from 'react';
import { COMPARISON_DATA } from '../data/bakeryData';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

interface ComparisonSectionProps {
  onStartQuiz: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  onStartQuiz,
}) => {
  return (
    <section id="comparison-section" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Sparkles size={13} />
            <span>The Levain Quality Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1C38] tracking-tight">
            Atelier Levain vs. Supermarket Cookies
          </h2>
          <p className="text-base text-[#4A5D78] leading-relaxed">
            Most commercial grocery cookies are flat, dry, and loaded with palm oil and artificial flavorings. See why our 6-ounce molten center cookies set the gold standard.
          </p>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-[#E5DCC8] overflow-hidden shadow-xl">
          
          {/* Table Header Row */}
          <div className="grid grid-cols-12 bg-[#FBF8F2] border-b border-[#E8DFC8] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1C38]">
            <div className="col-span-4 sm:col-span-3 p-4 sm:p-5 flex items-center">
              Standard
            </div>
            <div className="col-span-5 sm:col-span-5 p-4 sm:p-5 bg-[#0047FF] text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE27D]" />
              <span>Atelier Levain (6-oz)</span>
            </div>
            <div className="col-span-3 sm:col-span-4 p-4 sm:p-5 text-[#6A7E99] flex items-center">
              Grocery Store Cookies
            </div>
          </div>

          {/* Table Data Rows */}
          <div className="divide-y divide-[#E8DFC8]">
            {COMPARISON_DATA.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 text-xs sm:text-sm items-stretch">
                
                {/* Aspect Label */}
                <div className="col-span-4 sm:col-span-3 p-4 sm:p-5 font-bold text-[#0A1C38] bg-[#FBF8F2] flex items-center">
                  {row.aspect}
                </div>

                {/* Atelier Levain Column (Highlighted in Royal Blue Tint) */}
                <div className="col-span-5 sm:col-span-5 p-4 sm:p-5 bg-[#E8F0FE] border-x border-[#C5D9FC] text-[#0A1C38] flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="leading-relaxed font-semibold">{row.atelierLevain}</span>
                </div>

                {/* Supermarket Column */}
                <div className="col-span-3 sm:col-span-4 p-4 sm:p-5 text-[#6A7E99] bg-white flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#FCEBEB] text-[#C93B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <X size={13} strokeWidth={3} />
                  </div>
                  <span className="leading-relaxed">{row.traditionalStore}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Conversion Callout */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-sm font-semibold text-[#0A1C38]">
            Experience the difference when warm molten chocolate meets a crispy crust.
          </p>
          <button
            onClick={onStartQuiz}
            className="px-8 py-3.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full shadow-lg uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Build Your Cookie Box</span>
            <ArrowRight size={14} className="text-[#FFE27D]" />
          </button>
        </div>

      </div>
    </section>
  );
};

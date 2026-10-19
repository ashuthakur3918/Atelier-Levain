import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../data/bakeryData';
import { SubscriptionPlan, SlicingOption } from '../types/bakery';
import { Check, Sparkles, ArrowRight, Gift, Package } from 'lucide-react';

interface SubscriptionPlansSectionProps {
  onSelectPlan: (plan: SubscriptionPlan, slicing: SlicingOption) => void;
  onTakeQuiz: () => void;
}

export const SubscriptionPlansSection: React.FC<SubscriptionPlansSectionProps> = ({
  onSelectPlan,
  onTakeQuiz,
}) => {
  return (
    <section id="plans-section" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Sparkles size={13} />
            <span>The Levain Cookie Club</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1C38] tracking-tight">
            Never Run Out of Fresh 6-oz Giant Cookies
          </h2>
          <p className="text-base text-[#4A5D78] leading-relaxed">
            Get your favorite fresh-baked Levain cookies delivered right to your door every month. 15% off regular prices, free express shipping, and full flexibility to swap flavors or pause anytime.
          </p>

          <div className="pt-2">
            <button
              onClick={onTakeQuiz}
              className="text-xs font-bold text-[#0047FF] hover:text-[#0038CC] inline-flex items-center gap-1.5 underline decoration-[#0047FF]/40"
            >
              <span>Prefer to build a one-time custom gift box instead?</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* 3-Tier Subscription Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  isPopular
                    ? 'border-2 border-[#0047FF] bg-white shadow-xl ring-4 ring-[#0047FF]/10'
                    : 'border border-[#E5DCC8] bg-white shadow-xs hover:border-[#0047FF]/60'
                }`}
              >
                {/* Popular Pill Marker */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0047FF] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    Most Popular Choice · Free Shipping Included
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Title & Household */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0047FF]">
                      {plan.householdSize}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#0A1C38]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#556984] leading-relaxed">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DFC8] space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#6A7E99]">Monthly Member Price:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-[#99A8BC] line-through tabular-nums">
                          ${plan.fullPrice.toFixed(2)}
                        </span>
                        <span className="text-2xl sm:text-3xl font-bold text-[#0A1C38] tabular-nums">
                          ${plan.firstBoxDiscountPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-[#6A7E99]">/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE3D6]">
                      <span className="text-[#0047FF] font-bold">15% SAVINGS</span>
                      <span className="text-[#4A5D78] font-mono text-[11px]">{plan.pricePerMealOrDay}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38] block">
                      Club Inclusions:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#334661] leading-snug">
                        <Check size={14} className="text-[#0047FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Card Action Button */}
                <div className="mt-8 pt-6 border-t border-[#E8DFC8] space-y-2">
                  <button
                    onClick={() => onSelectPlan(plan, 'sliced-standard')}
                    className={`w-full py-3.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] ${
                      isPopular
                        ? 'bg-[#0047FF] hover:bg-[#0038CC] text-white shadow-md'
                        : 'bg-[#0A1C38] hover:bg-[#152E58] text-white'
                    }`}
                  >
                    <span>Join The Cookie Club</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[11px] text-center text-[#7A8EAA]">
                    Free Express Shipping · Skip or Cancel Anytime
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

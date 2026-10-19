import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS, BAKERY_ITEMS } from '../data/bakeryData';
import { SubscriptionPlan, SlicingOption } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: SubscriptionPlan, slicing: SlicingOption) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [householdSize, setHouseholdSize] = useState<'1-2' | '3-4' | '5+'>('3-4');
  const [habit, setHabit] = useState<'daily-toast' | 'weekend-brunch' | 'dinner-stew' | 'pastries'>('daily-toast');
  const [dietary, setDietary] = useState<'digestion' | 'wholegrain' | 'french' | 'variety'>('digestion');
  const [slicing, setSlicing] = useState<SlicingOption>('sliced-standard');
  const [cadence, setCadence] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');

  // Match the best subscription plan based on quiz answers
  const getMatchedPlan = (): SubscriptionPlan => {
    if (householdSize === '1-2') {
      return SUBSCRIPTION_PLANS[0]; // Starter Loaf Plan
    }
    if (householdSize === '5+') {
      return SUBSCRIPTION_PLANS[2]; // Connoisseur Plan
    }
    return SUBSCRIPTION_PLANS[1]; // Family Plan (Most Popular)
  };

  const matchedPlan = getMatchedPlan();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmPlan = () => {
    onSelectPlan(matchedPlan, slicing);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1E1E]/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E5DCCB] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Progress Bar & Header */}
        <div className="p-6 border-b border-[#EAE3D6] bg-[#FDFBF7] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E05A2B]">
              <Sparkles size={14} />
              <span>Step {currentStep} of 6: Build Your Plan</span>
            </div>
            <div className="w-48 sm:w-64 h-2 bg-[#EFE9DE] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#E05A2B] transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#777] hover:text-[#1E1E1E] rounded-full hover:bg-[#EAE3D6] transition-colors"
            aria-label="Close quiz"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quiz Steps Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* Step 1: Household Size */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#1E1E1E]">
                  How many bread lovers are in your home?
                </h3>
                <p className="text-sm text-[#666]">
                  We portion loaves and pastries so your household always has fresh bread without waste.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: '1-2', label: '1–2 People', desc: 'Solo or couple routine (2 loaves/week)' },
                  { id: '3-4', label: '3–4 People', desc: 'Family standard (3 loaves + 4 pastries)', popular: true },
                  { id: '5+', label: '5+ People', desc: 'Big household feast & entertaining' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHouseholdSize(opt.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      householdSize === opt.id
                        ? 'border-[#E05A2B] bg-[#FFF8F5] ring-2 ring-[#E05A2B]'
                        : 'border-[#E0D8CA] bg-white hover:border-[#D5CCBC]'
                    }`}
                  >
                    {opt.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E05A2B] block mb-1">
                        Most Popular
                      </span>
                    )}
                    <div className="text-lg font-bold text-[#1E1E1E]">{opt.label}</div>
                    <div className="text-xs text-[#666] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Primary Habit */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#1E1E1E]">
                  What is your primary bread routine?
                </h3>
                <p className="text-sm text-[#666]">
                  This helps us curate your starter rotation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'daily-toast', title: 'Daily Toast & Morning Eggs', desc: 'Crisp golden slices with high custardy crumb' },
                  { id: 'weekend-brunch', title: 'Weekend Brunch & Sandwiches', desc: 'Gourmet sandwiches, avocado tartines, and butter' },
                  { id: 'dinner-stew', title: 'Dinner Dipping & Soups', desc: 'Thick blistered crusts made for soaking rich sauces' },
                  { id: 'pastries', title: 'Morning Viennoiserie & Espresso', desc: 'Flaky AOP butter croissants & dark chocolate rolls' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHabit(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      habit === opt.id
                        ? 'border-[#E05A2B] bg-[#FFF8F5] ring-2 ring-[#E05A2B]'
                        : 'border-[#E0D8CA] bg-white hover:border-[#D5CCBC]'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#1E1E1E]">{opt.title}</div>
                    <div className="text-xs text-[#666] mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Dietary Focus */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#1E1E1E]">
                  Do you have any dietary or wellness goals?
                </h3>
                <p className="text-sm text-[#666]">
                  Every loaf is made with 100% stoneground organic grains and zero additives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'digestion', title: 'Gentle Digestion & Gut Health', desc: '36-hour wild levain breaks down gluten and phytic acid' },
                  { id: 'wholegrain', title: 'High Fiber & Seeded Whole Grain', desc: 'Danish whole rye and ancient spelt for sustained energy' },
                  { id: 'french', title: 'Authentic French Pastry Indulgence', desc: 'Churned AOP Charentes-Poitou French pasture butter' },
                  { id: 'variety', title: 'Balanced Variety of Everything', desc: 'A curated mix of sourdough hearth loaves and pastries' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDietary(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      dietary === opt.id
                        ? 'border-[#E05A2B] bg-[#FFF8F5] ring-2 ring-[#E05A2B]'
                        : 'border-[#E0D8CA] bg-white hover:border-[#D5CCBC]'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#1E1E1E]">{opt.title}</div>
                    <div className="text-xs text-[#666] mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Slicing Choice */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#1E1E1E]">
                  How would you like your hearth loaves sliced?
                </h3>
                <p className="text-sm text-[#666]">
                  Our German precision bread slicer cuts perfect even slices before delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'sliced-standard', label: 'Sliced 12mm', desc: 'Standard table thickness for daily toast and sandwiches' },
                  { id: 'sliced-thick', label: 'Thick 18mm', desc: 'Hearty tartines, French toast, and open-faced toasts' },
                  { id: 'whole', label: 'Whole Uncut', desc: 'Maximum crust longevity; slice fresh at home with bread knife' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSlicing(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      slicing === opt.id
                        ? 'border-[#E05A2B] bg-[#FFF8F5] ring-2 ring-[#E05A2B]'
                        : 'border-[#E0D8CA] bg-white hover:border-[#D5CCBC]'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#1E1E1E]">{opt.label}</div>
                    <div className="text-xs text-[#666] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Delivery Cadence */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#1E1E1E]">
                  Select your delivery frequency
                </h3>
                <p className="text-sm text-[#666]">
                  Delivered fresh every Thursday or Saturday morning. Pause or cancel anytime online.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'weekly', label: 'Every Week', desc: '30% Off First Box + Best Value', discount: '30% OFF' },
                  { id: 'biweekly', label: 'Every 2 Weeks', desc: 'Freeze extra slices easily', discount: '20% OFF' },
                  { id: 'monthly', label: 'Every Month', desc: 'Pantry restocking box', discount: '10% OFF' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCadence(opt.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      cadence === opt.id
                        ? 'border-[#E05A2B] bg-[#FFF8F5] ring-2 ring-[#E05A2B]'
                        : 'border-[#E0D8CA] bg-white hover:border-[#D5CCBC]'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#287A2E] bg-[#EAF5E9] px-2 py-0.5 rounded-full inline-block mb-1">
                      {opt.discount}
                    </span>
                    <div className="font-bold text-base text-[#1E1E1E]">{opt.label}</div>
                    <div className="text-xs text-[#666] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Instant Personalized Plan Reveal */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E05A2B] bg-[#FFF1EB] px-3 py-1 rounded-full border border-[#FCD9CC]">
                  Personalized Match Ready
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1E1E]">
                  {matchedPlan.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#555] max-w-md mx-auto">
                  {matchedPlan.subtitle}
                </p>
              </div>

              {/* Matched Plan Card */}
              <div className="p-6 rounded-2xl border-2 border-[#E05A2B] bg-[#FFFBF8] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5E5D8] pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#E05A2B] uppercase tracking-wide">
                      Household Routine: {householdSize === '1-2' ? '1–2 People' : householdSize === '3-4' ? '3–4 People' : '5+ Feast'}
                    </span>
                    <div className="text-xl font-bold text-[#1E1E1E]">
                      {matchedPlan.cookieCount} Giant 6-oz Cookies
                    </div>
                    <span className="text-xs text-[#666]">
                      Delivered monthly with Free Express Shipping
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <div className="flex items-baseline sm:justify-end gap-2">
                      <span className="text-sm text-[#999] line-through tabular-nums">
                        ${matchedPlan.fullPrice.toFixed(2)}
                      </span>
                      <span className="text-3xl font-bold text-[#1E1E1E] tabular-nums">
                        ${matchedPlan.firstBoxDiscountPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#287A2E] block">
                      30% Off First Box Applied · Free Shipping
                    </span>
                    <span className="text-[11px] text-[#777] block">
                      Just {matchedPlan.pricePerMealOrDay}
                    </span>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#444] block">
                    What’s included in your box:
                  </span>
                  {matchedPlan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#333]">
                      <Check size={14} className="text-[#287A2E] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Money Back & Freshness Guarantee */}
                <div className="p-3 bg-white rounded-xl border border-[#EAE3D6] flex items-center gap-3 text-xs text-[#555]">
                  <ShieldCheck size={20} className="text-[#287A2E] shrink-0" />
                  <span>
                    <strong>100% Freshness Guarantee:</strong> If a loaf does not arrive in bakery-fresh condition, we will replace or refund it immediately.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-6 bg-[#FDFBF7] border-t border-[#EAE3D6] flex items-center justify-between gap-4">
          {currentStep > 1 && currentStep < 6 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 text-xs font-bold text-[#555] hover:text-[#1E1E1E] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}

          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 text-xs font-bold text-white bg-[#E05A2B] hover:bg-[#C94D22] rounded-full uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleConfirmPlan}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold text-white bg-[#E05A2B] hover:bg-[#C94D22] rounded-full uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Start My Plan & Add to Bag</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

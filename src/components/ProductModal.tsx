import React, { useState } from 'react';
import { BakeryItem, SlicingOption } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Flame,
  Sparkles,
  Check,
  ShieldCheck,
  Activity,
  AlertCircle,
  FileText,
  HeartPulse,
} from 'lucide-react';

interface ProductModalProps {
  item: BakeryItem | null;
  onClose: () => void;
  onAddToCart: (item: BakeryItem, quantity: number, slicing: SlicingOption) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition'>('overview');
  const [quantity, setQuantity] = useState(1);
  const [slicing, setSlicing] = useState<SlicingOption>('sliced-standard');
  const isBread = item.category === 'breads';

  const handleAdd = () => {
    onAddToCart(item, quantity, slicing);
    onClose();
  };

  const nutrition = item.nutrition;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A1C38]/70 backdrop-blur-xs animate-in fade-in"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E5DCC8] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#556984] hover:text-[#0A1C38] bg-white/90 hover:bg-white rounded-full border border-[#E5DCC8] transition-colors shadow-2xs"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Visual Banner */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E8DFC8] bg-[#FAF6EE]">
            <BakeryArtwork type={item.artworkType} className="w-full h-full object-cover" />
            {item.badge && (
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0A1C38] text-xs font-bold px-3 py-1 rounded-full border border-[#E5DCC8] shadow-2xs">
                {item.badge}
              </div>
            )}
            {item.gooeyRating && (
              <div className="absolute top-3 right-3 bg-[#0047FF] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                <Flame size={12} className="text-[#FFE27D]" />
                <span>Molten Gooey Center</span>
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#E8DFC8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0047FF]">
                {item.weight}
              </span>
              <h2 id="modal-product-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1C38] mt-1">
                {item.name}
              </h2>
              {item.frenchName && (
                <p className="text-xs italic text-[#7A8EAA]">
                  {item.frenchName}
                </p>
              )}
            </div>
            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-bold text-[#0A1C38] tabular-nums">
                ${item.price.toFixed(2)}
              </span>
              {item.pricePerServing && (
                <span className="block text-xs text-[#6A7E99] font-mono">
                  ${item.pricePerServing.toFixed(2)} / serving
                </span>
              )}
            </div>
          </div>

          {/* Tab Navigation: Overview vs Nutritional Profile & Allergens */}
          <div className="flex items-center gap-2 p-1.5 bg-[#FAF6EE] rounded-2xl border border-[#E5DCC8]">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
                activeTab === 'overview'
                  ? 'bg-white text-[#0A1C38] shadow-xs'
                  : 'text-[#556984] hover:text-[#0A1C38]'
              }`}
            >
              <FileText size={14} />
              <span>Overview & Baking Craft</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('nutrition')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
                activeTab === 'nutrition'
                  ? 'bg-[#0047FF] text-white shadow-xs'
                  : 'text-[#556984] hover:text-[#0047FF]'
              }`}
            >
              <Activity size={14} />
              <span>Nutritional Profile & Allergens</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW CONTENT */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Description */}
              <p className="text-sm text-[#4A5D78] leading-relaxed">
                {item.description}
              </p>

              {/* Whole Ingredients Spotlight */}
              <div className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DFC8] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38] block">
                  All Natural Ingredients:
                </span>
                <p className="text-xs text-[#556984] leading-relaxed">
                  {item.ingredients.join(' · ')}
                </p>
              </div>

              {/* Levain Reheat Ritual callout */}
              <div className="p-4 bg-[#E8F0FE] rounded-2xl border border-[#C5D9FC] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0047FF] uppercase tracking-wider">
                  <Flame size={14} />
                  <span>The Levain 5-Minute Warm Cookie Ritual</span>
                </div>
                <p className="text-xs text-[#334661] leading-relaxed">
                  For the ultimate bakery-counter experience, warm in a 350°F oven for 4–5 minutes (or microwave for 10–12 seconds). The outside recrisps while the chocolate chips return to molten lava!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: NUTRITIONAL PROFILE & ALLERGENS CONTENT */}
          {activeTab === 'nutrition' && nutrition && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Serving Info Banner */}
              <div className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A8EAA] block">
                    Serving Size Reference
                  </span>
                  <span className="text-sm font-bold text-[#0A1C38]">
                    {nutrition.servingSize}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A8EAA] block">
                    Servings Per Container
                  </span>
                  <span className="text-sm font-mono font-bold text-[#0A1C38]">
                    {nutrition.servingsPerContainer} servings ({item.weight})
                  </span>
                </div>
              </div>

              {/* Calories Highlight Card */}
              <div className="p-5 bg-[#0A1C38] text-white rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#4E8CF6] block">
                    Amount Per Serving
                  </span>
                  <span className="text-3xl font-serif font-extrabold text-white tracking-tight">
                    Calories
                  </span>
                  <span className="text-xs text-[#C5D9FC] block mt-0.5">
                    {nutrition.calories * nutrition.servingsPerContainer} kcal total per entire piece
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold font-mono tabular-nums text-white">
                    {nutrition.calories}
                  </span>
                  <span className="block text-[11px] text-[#A5C0E8]">kcal / serving</span>
                </div>
              </div>

              {/* Macronutrients Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38] block">
                  Macronutrient Breakdown (Per Serving):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E5DCC8] text-center">
                    <span className="text-[10px] uppercase font-bold text-[#6A7E99] block">Total Fat</span>
                    <span className="text-lg font-bold text-[#0A1C38] tabular-nums">{nutrition.totalFatGrams}g</span>
                    <span className="text-[10px] text-[#7A8EAA] block">{nutrition.saturatedFatGrams}g sat fat</span>
                  </div>

                  <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E5DCC8] text-center">
                    <span className="text-[10px] uppercase font-bold text-[#6A7E99] block">Total Carbs</span>
                    <span className="text-lg font-bold text-[#0A1C38] tabular-nums">{nutrition.totalCarbGrams}g</span>
                    <span className="text-[10px] text-[#7A8EAA] block">{nutrition.dietaryFiberGrams}g fiber</span>
                  </div>

                  <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E5DCC8] text-center">
                    <span className="text-[10px] uppercase font-bold text-[#6A7E99] block">Sugars</span>
                    <span className="text-lg font-bold text-[#0A1C38] tabular-nums">{nutrition.sugarGrams}g</span>
                    <span className="text-[10px] text-[#7A8EAA] block">natural cane & brown</span>
                  </div>

                  <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E5DCC8] text-center">
                    <span className="text-[10px] uppercase font-bold text-[#6A7E99] block">Protein</span>
                    <span className="text-lg font-bold text-[#0047FF] tabular-nums">{nutrition.proteinGrams}g</span>
                    <span className="text-[10px] text-[#7A8EAA] block">{nutrition.sodiumMg}mg sodium</span>
                  </div>
                </div>
              </div>

              {/* Prominent Allergen Disclosure Section */}
              <div className="p-5 bg-white rounded-2xl border-2 border-[#E5DCC8] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-[#0A1C38]">
                  <AlertCircle size={18} className="text-[#0047FF]" />
                  <h4 className="font-serif font-bold text-sm">
                    Allergen & Dietary Information
                  </h4>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2 text-xs">
                    <strong className="text-[#0A1C38] shrink-0">Contains Allergens:</strong>
                    <span className="text-[#556984] font-medium">
                      {nutrition.allergenSummary.contains.join(', ')}
                    </span>
                  </div>

                  {/* Badges for dietary safety */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {nutrition.allergenSummary.isNutFree && (
                      <span className="text-[11px] font-bold text-[#287A2E] bg-[#EAF5E9] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        <span>100% Nut-Free Recipe</span>
                      </span>
                    )}
                    {nutrition.allergenSummary.isDairyFree && (
                      <span className="text-[11px] font-bold text-[#287A2E] bg-[#EAF5E9] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        <span>100% Dairy-Free</span>
                      </span>
                    )}
                    {nutrition.allergenSummary.isVegan && (
                      <span className="text-[11px] font-bold text-[#287A2E] bg-[#EAF5E9] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        <span>Vegan Friendly</span>
                      </span>
                    )}
                    {nutrition.allergenSummary.isSoyFree && (
                      <span className="text-[11px] font-bold text-[#287A2E] bg-[#EAF5E9] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        <span>Soy-Free</span>
                      </span>
                    )}
                  </div>

                  {/* Cross contamination facility notice */}
                  {nutrition.allergenSummary.facilityNotice && (
                    <p className="text-[11px] text-[#7A8EAA] leading-relaxed pt-1">
                      <strong>Facility Notice:</strong> {nutrition.allergenSummary.facilityNotice}
                    </p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Slicing Selection for Loaves (Always accessible if bread) */}
          {isBread && (
            <div className="space-y-2 pt-4 border-t border-[#E8DFC8]">
              <label className="text-xs font-bold text-[#0A1C38] block">
                Artisan Slicing Preference:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSlicing('sliced-standard')}
                  className={`p-3 text-xs font-bold rounded-xl border text-left transition-all ${
                    slicing === 'sliced-standard'
                      ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF] text-[#0A1C38]'
                      : 'border-[#E5DCC8] bg-white text-[#556984] hover:border-[#0047FF]'
                  }`}
                >
                  <div>Sliced 12mm</div>
                  <div className="text-[10px] font-normal text-[#7A8EAA] mt-0.5">Daily Table & Sandwiches</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSlicing('sliced-thick')}
                  className={`p-3 text-xs font-bold rounded-xl border text-left transition-all ${
                    slicing === 'sliced-thick'
                      ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF] text-[#0A1C38]'
                      : 'border-[#E5DCC8] bg-white text-[#556984] hover:border-[#0047FF]'
                  }`}
                >
                  <div>Thick 18mm</div>
                  <div className="text-[10px] font-normal text-[#7A8EAA] mt-0.5">Hearty Toast & Tartine</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSlicing('whole')}
                  className={`p-3 text-xs font-bold rounded-xl border text-left transition-all ${
                    slicing === 'whole'
                      ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF] text-[#0A1C38]'
                      : 'border-[#E5DCC8] bg-white text-[#556984] hover:border-[#0047FF]'
                  }`}
                >
                  <div>Whole Loaf</div>
                  <div className="text-[10px] font-normal text-[#7A8EAA] mt-0.5">Longest Crust Freshness</div>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-6 bg-[#FAF6EE] border-t border-[#E8DFC8] flex items-center justify-between gap-4 shrink-0">
          {/* Stepper */}
          <div className="flex items-center border border-[#D5CBBA] rounded-full bg-white p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-[#556984] hover:text-[#0A1C38] rounded-full transition-colors disabled:opacity-40"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#0A1C38] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#556984] hover:text-[#0A1C38] rounded-full transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full transition-all shadow-md uppercase tracking-wider"
          >
            <ShoppingBag size={15} />
            <span>Add to Bag</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">
              ${(item.price * quantity).toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

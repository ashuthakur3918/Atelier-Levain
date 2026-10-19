import React, { useState } from 'react';
import { BAKERY_ITEMS } from '../data/bakeryData';
import { BakeryItem, CookieBoxCustomization } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';
import { Plus, Minus, Check, Gift, Sparkles, Heart, Package } from 'lucide-react';

interface BuildYourOwnBoxProps {
  onAddBoxToCart: (boxItem: BakeryItem, customDetails: CookieBoxCustomization) => void;
}

export const BuildYourOwnBox: React.FC<BuildYourOwnBoxProps> = ({
  onAddBoxToCart,
}) => {
  const [boxSize, setBoxSize] = useState<4 | 8 | 12>(8);
  const [selectedCounts, setSelectedCounts] = useState<Record<string, number>>({
    'chocolate-chip-walnut': 3,
    'two-chip-chocolate': 3,
    'dark-chocolate-pb': 2,
    'birthday-cake-cookie': 0,
  });
  const [boxStyle, setBoxStyle] = useState<'signature-blue-ribbon' | 'milkbar-confetti'>('signature-blue-ribbon');
  const [giftNote, setGiftNote] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [addedMessage, setAddedMessage] = useState(false);

  // Available cookies for the box
  const cookieOptions = BAKERY_ITEMS.filter((item) => item.category === 'cookies');

  const totalSelected = Object.values(selectedCounts).reduce((a, b) => a + b, 0);
  const remaining = boxSize - totalSelected;

  const boxPrice = boxSize === 4 ? 29.00 : boxSize === 8 ? 49.00 : 69.00;

  const handleAdjustCount = (id: string, delta: number) => {
    const current = selectedCounts[id] || 0;
    const newCount = Math.max(0, current + delta);
    
    // Check if adding exceeds box capacity
    if (delta > 0 && totalSelected >= boxSize) {
      return;
    }

    setSelectedCounts({
      ...selectedCounts,
      [id]: newCount,
    });
  };

  const handleBoxSizeChange = (newSize: 4 | 8 | 12) => {
    setBoxSize(newSize);
    // Auto balance counts if over limit
    let currentTotal = Object.values(selectedCounts).reduce((a, b) => a + b, 0);
    if (currentTotal > newSize) {
      setSelectedCounts({
        'chocolate-chip-walnut': Math.floor(newSize / 2),
        'two-chip-chocolate': Math.ceil(newSize / 2),
      });
    }
  };

  const handleAddToCart = () => {
    if (remaining > 0) return;

    const customDetails: CookieBoxCustomization = {
      size: boxSize,
      selectedItems: { ...selectedCounts },
      giftNote,
      recipientName,
      boxStyle,
    };

    const boxItem: BakeryItem = {
      id: `custom-box-${boxSize}-${Date.now()}`,
      name: `Custom ${boxSize}-Pack Cookie Gift Box`,
      frenchName: 'Coffret Personnalisé 6-oz Cookies',
      category: 'tins',
      lineType: 'gift-boxes',
      description: `Custom ${boxSize}-pack containing: ${Object.entries(selectedCounts)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => {
          const matched = cookieOptions.find((c) => c.id === id);
          return `${qty}x ${matched?.name || id}`;
        })
        .join(', ')}. ${giftNote ? `Gift note: "${giftNote}"` : ''}`,
      price: boxPrice,
      weight: `${boxSize * 6} oz (${boxSize} Giant Cookies)`,
      ingredients: ['Assortment of freshly baked 6-oz giant cookies'],
      allergens: ['Wheat / Gluten', 'Milk / Dairy', 'Eggs'],
      dietaryTags: [],
      isAvailableToday: true,
      badge: `${boxSize}-Pack Gift Box`,
      artworkType: 'cookie-gift-tin',
    };

    onAddBoxToCart(boxItem, customDetails);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <section id="build-a-box" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Gift size={13} />
            <span>The Signature Levain Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1C38] tracking-tight">
            Build Your Custom Cookie Box
          </h2>
          <p className="text-base text-[#4A5D78] leading-relaxed">
            Customize an assortment of our giant 6-ounce cookies. Baked fresh each morning, hand-packed in our signature deep navy gift box with a cornflower blue satin ribbon, and shipped nationwide.
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-white rounded-3xl border-2 border-[#E5DCC8] p-6 sm:p-10 shadow-xl max-w-5xl mx-auto">
          
          {/* Step 1: Box Size Selector */}
          <div className="space-y-4 pb-8 border-b border-[#E8DFC8]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38]">
                Step 1: Choose Your Box Size
              </span>
              <span className="text-xs font-bold text-[#0047FF]">
                {boxSize * 6} Ounces of Warm Gooey Happiness
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {[
                { size: 4, label: '4-Pack Box', sub: '1.5 lbs of cookies', price: '$29' },
                { size: 8, label: '8-Pack Box', sub: 'Most Popular Gift', price: '$49', popular: true },
                { size: 12, label: '12-Pack Party Tin', sub: '4.5 lbs of indulgence', price: '$69' },
              ].map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => handleBoxSizeChange(opt.size as 4 | 8 | 12)}
                  className={`p-4 sm:p-5 rounded-2xl border text-center transition-all ${
                    boxSize === opt.size
                      ? 'border-[#0047FF] bg-[#0047FF] text-white shadow-lg ring-2 ring-[#0047FF]/20'
                      : 'border-[#E5DCC8] bg-[#FBF8F2] text-[#0A1C38] hover:border-[#0047FF]'
                  }`}
                >
                  {opt.popular && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${boxSize === opt.size ? 'text-[#FFE27D]' : 'text-[#0047FF]'}`}>
                      ★ Bestseller
                    </span>
                  )}
                  <div className="font-serif font-bold text-base sm:text-lg">{opt.label}</div>
                  <div className={`text-xs mt-0.5 ${boxSize === opt.size ? 'text-[#E8F0FE]' : 'text-[#6A7E99]'}`}>{opt.sub}</div>
                  <div className="text-lg font-bold font-mono mt-2 tabular-nums">{opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor Counter */}
          <div className="py-8 border-b border-[#E8DFC8] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38] block">
                  Step 2: Select Your Flavors
                </span>
                <span className="text-xs text-[#556984]">
                  Mix and match any combination of our legendary 6-oz cookies.
                </span>
              </div>

              {/* Progress counter pill */}
              <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 ${
                remaining === 0
                  ? 'bg-[#EAF5E9] text-[#287A2E] border border-[#C5DEC3]'
                  : 'bg-[#E8F0FE] text-[#0047FF] border border-[#C5D9FC]'
              }`}>
                {remaining === 0 ? (
                  <>
                    <Check size={14} />
                    <span>Box Complete ({boxSize} of {boxSize})!</span>
                  </>
                ) : (
                  <>
                    <Package size={14} />
                    <span>{totalSelected} of {boxSize} Selected · Pick {remaining} more</span>
                  </>
                )}
              </div>
            </div>

            {/* Cookie Flavor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cookieOptions.map((cookie) => {
                const count = selectedCounts[cookie.id] || 0;

                return (
                  <div
                    key={cookie.id}
                    className="p-4 rounded-2xl border border-[#E5DCC8] bg-[#FBF8F2] flex items-center justify-between gap-4 transition-colors hover:border-[#0047FF]/50"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E5DCC8] bg-white">
                      <BakeryArtwork type={cookie.artworkType} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-serif font-bold text-sm text-[#0A1C38] truncate">
                        {cookie.name}
                      </h4>
                      <p className="text-[11px] text-[#6A7E99] line-clamp-1">
                        {cookie.badge || '6 oz Giant Cookie'}
                      </p>
                    </div>

                    {/* Stepper buttons */}
                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#D5CBBA]">
                      <button
                        type="button"
                        onClick={() => handleAdjustCount(cookie.id, -1)}
                        className="p-1.5 text-[#555] hover:text-[#0047FF] disabled:opacity-30 transition-colors"
                        disabled={count <= 0}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums text-[#0A1C38]">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdjustCount(cookie.id, 1)}
                        className="p-1.5 text-[#555] hover:text-[#0047FF] disabled:opacity-30 transition-colors"
                        disabled={totalSelected >= boxSize}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Packaging & Handwritten Gift Card */}
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38]">
                Step 3: Complimentary Gifting & Packaging
              </span>
              <span className="text-xs font-semibold text-[#0047FF]">
                Free Satin Ribbon & Message Included
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBoxStyle('signature-blue-ribbon')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  boxStyle === 'signature-blue-ribbon'
                    ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF]'
                    : 'border-[#E5DCC8] bg-white hover:border-[#0047FF]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A1C38]">Levain Signature Navy Box & Blue Ribbon</div>
                  <div className="text-[11px] text-[#556984] mt-0.5">Classic bakery gift box hand-tied with cornflower blue satin ribbon</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBoxStyle('milkbar-confetti')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  boxStyle === 'milkbar-confetti'
                    ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF]'
                    : 'border-[#E5DCC8] bg-white hover:border-[#0047FF]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A1C38]">Celebration Collector Tin</div>
                  <div className="text-[11px] text-[#556984] mt-0.5">Keepsake metal cookie tin with festive birthday confetti seal</div>
                </div>
              </button>
            </div>

            {/* Gift Note Input */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Recipient Name (e.g. Aunt Sarah)"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="px-4 py-2.5 text-xs bg-[#FBF8F2] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                />
                <input
                  type="text"
                  placeholder="Handwritten Gift Card Note (e.g. Happy Birthday, enjoy the warm gooey cookies!)"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="px-4 py-2.5 text-xs bg-[#FBF8F2] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                />
              </div>
            </div>
          </div>

          {/* Builder Bottom Action Bar */}
          <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#6A7E99] block">Total Box Price</span>
              <span className="text-3xl font-serif font-bold text-[#0A1C38] tabular-nums">
                ${boxPrice.toFixed(2)}
              </span>
              <span className="text-xs text-[#0047FF] font-medium block">
                Free Nationwide 2-Day Express Shipping on 8 & 12 Packs
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={remaining > 0}
              className={`px-8 py-4 text-xs font-bold rounded-full uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                remaining === 0
                  ? 'bg-[#0047FF] hover:bg-[#0038CC] text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-[#DDD5C7] text-[#777] cursor-not-allowed'
              }`}
            >
              <span>{remaining === 0 ? 'Add Custom Box to Bag' : `Select ${remaining} More to Add`}</span>
              <Sparkles size={14} className="text-[#FFE27D]" />
            </button>
          </div>

          {addedMessage && (
            <div className="mt-4 p-3 bg-[#EAF5E9] text-[#287A2E] text-xs font-bold rounded-xl flex items-center gap-2 border border-[#C5DEC3]">
              <Check size={16} />
              <span>Your Custom {boxSize}-Pack Cookie Box has been added to your bag!</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

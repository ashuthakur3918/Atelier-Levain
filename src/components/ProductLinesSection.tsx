import React, { useState } from 'react';
import { BakeryItem } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';
import { Plus, Flame, Sparkles, Activity, Gift } from 'lucide-react';

interface ProductLinesSectionProps {
  items: BakeryItem[];
  onSelectItem: (item: BakeryItem) => void;
  onQuickAdd: (item: BakeryItem) => void;
}

export const ProductLinesSection: React.FC<ProductLinesSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'cookies' | 'gift-boxes' | 'cakes-treats' | 'hearth-breads'>('all');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.lineType === activeTab;
  });

  return (
    <section id="products-section" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Sparkles size={13} className="text-[#0047FF]" />
            <span>The Fresh Baked Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1C38] tracking-tight">
            World-Famous Cookies & Bakery Treats
          </h2>
          <p className="text-base text-[#4A5D78] leading-relaxed">
            Baked with 100% Grade-A creamery butter, rich dark and semi-sweet chocolates, and unbleached flours. Shipped nationwide in signature gift tins with handwritten notes.
          </p>
        </div>

        {/* Tab Filters in Levain Signature Royal Blue */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Treats' },
            { id: 'cookies', label: 'Giant 6-oz Cookies' },
            { id: 'gift-boxes', label: 'Gift Boxes & Tins' },
            { id: 'cakes-treats', label: 'Celebration Treats' },
            { id: 'hearth-breads', label: 'Artisan Hearth Breads' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all whitespace-nowrap uppercase tracking-wider ${
                activeTab === tab.id
                  ? 'bg-[#0047FF] text-white shadow-md'
                  : 'bg-white text-[#4A5D78] border border-[#E5DCC8] hover:bg-[#E8F0FE] hover:text-[#0047FF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-white rounded-3xl border border-[#E5DCC8] overflow-hidden flex flex-col justify-between transition-all hover:border-[#0047FF] hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Visual Lead */}
                <div className="relative aspect-[4/3] w-full bg-[#FBF8F2] overflow-hidden">
                  <BakeryArtwork type={item.artworkType} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0A1C38] text-xs font-bold px-3 py-1 rounded-full border border-[#E5DCC8] shadow-xs">
                      {item.badge}
                    </div>
                  )}

                  {item.gooeyRating && (
                    <div className="absolute bottom-4 right-4 bg-[#0A1C38] text-[#FFE27D] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Flame size={12} className="text-[#0047FF]" />
                      <span>Gooey Lava Core: {item.gooeyRating}/5</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0047FF]">
                      {item.weight}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0A1C38] group-hover:text-[#0047FF] transition-colors">
                      {item.name}
                    </h3>
                    {item.frenchName && (
                      <p className="text-xs italic text-[#7A8EAA]">
                        {item.frenchName}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#556984] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Key Highlights */}
                  {item.nutritionalHighlights && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F2EDE4]">
                      {item.nutritionalHighlights.map((nh, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-[#4A5D78] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E5DCC8]"
                        >
                          {nh.label}: <strong className="text-[#0A1C38]">{nh.value}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-[#FBF8F2] border-t border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A8EAA] block">Price</span>
                  <span className="text-2xl font-bold font-serif text-[#0A1C38] tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="p-2.5 text-[#0A1C38] hover:text-[#0047FF] bg-white hover:bg-[#E8F0FE] rounded-full border border-[#D5CBBA] transition-colors"
                    title="View Nutrition & Details"
                  >
                    <Activity size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(item);
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.98] rounded-full shadow-xs transition-all flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <Plus size={14} />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

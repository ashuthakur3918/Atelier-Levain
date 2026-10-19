import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/bakeryData';
import { Star, CheckCircle2, Sparkles, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const filteredReviews = REVIEWS_DATA.filter((r) => {
    if (filterTag === 'all') return true;
    return r.tag === filterTag;
  });

  return (
    <section id="reviews-section" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Sparkles size={13} />
            <span>NYC Bakery Counter Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1C38] tracking-tight">
            Over 42,000 Five-Star Cookie Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex items-center gap-1 text-[#DF9A3E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#0A1C38]">4.9 out of 5 stars nationwide</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'Gooey Center', label: 'Gooey Center' },
            { id: 'Gift Tin Packaging', label: 'Signature Gift Tins' },
            { id: 'Celebration Treats', label: 'Celebration Treats' },
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => setFilterTag(tag.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all uppercase tracking-wider ${
                filterTag === tag.id
                  ? 'bg-[#0047FF] text-white shadow-md'
                  : 'bg-white text-[#4A5D78] border border-[#E5DCC8] hover:bg-[#E8F0FE] hover:text-[#0047FF]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-8 border border-[#E5DCC8] flex flex-col justify-between space-y-6 shadow-xs hover:border-[#0047FF]/50 transition-all"
            >
              <div className="space-y-4">
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#DF9A3E]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#0047FF] bg-[#E8F0FE] px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 size={13} />
                    <span>Verified Customer</span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base font-serif font-bold text-[#0A1C38] leading-snug">
                  "{rev.headline}"
                </h3>

                {/* Body Comment */}
                <p className="text-xs sm:text-sm text-[#4A5D78] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0A1C38] block">{rev.author}</span>
                  <span className="text-[#7A8EAA]">{rev.location} · {rev.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#8A9EBA] block">Favorite:</span>
                  <span className="font-semibold text-[#0047FF]">{rev.favoriteItem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

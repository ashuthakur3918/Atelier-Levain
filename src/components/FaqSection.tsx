import React, { useState } from 'react';
import { FAQ_DATA } from '../data/bakeryData';
import { ChevronDown, Sparkles, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [category, setCategory] = useState<string>('all');

  const filteredFaqs = FAQ_DATA.filter((f) => {
    if (category === 'all') return true;
    return f.category === category;
  });

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 bg-[#FAF6EE] border-b border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] text-[#0047FF] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C5D9FC]">
            <Sparkles size={13} />
            <span>Common Cookie Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1C38] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#4A5D78]">
            Everything you need to know about nationwide shipping, the 5-minute warm cookie ritual, and freezing tips.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'delivery', label: 'Nationwide Shipping' },
            { id: 'storage', label: 'Warming & Freezing' },
            { id: 'subscription', label: 'Cookie Club' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all uppercase tracking-wider ${
                category === c.id
                  ? 'bg-[#0047FF] text-white shadow-md'
                  : 'bg-white text-[#4A5D78] border border-[#E5DCC8] hover:bg-[#E8F0FE] hover:text-[#0047FF]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#0047FF] ring-2 ring-[#0047FF]/10 shadow-sm'
                    : 'border-[#E5DCC8] hover:border-[#0047FF]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#0A1C38] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`p-1 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0047FF] bg-[#E8F0FE]' : 'text-[#7A8EAA]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A5D78] leading-relaxed border-t border-[#F2EDE4] animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { BAKERY_LOCATIONS } from '../data/bakeryData';
import { FulfillmentMode } from '../types/bakery';
import { ShoppingBag, X, Menu, ArrowRight, Truck, Store, MapPin, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  fulfillmentMode: FulfillmentMode;
  selectedLocation: string;
  onSelectFulfillment: (mode: FulfillmentMode, locationId?: string) => void;
  onOpenCart: () => void;
  onBuildBoxClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  fulfillmentMode,
  selectedLocation,
  onSelectFulfillment,
  onOpenCart,
  onBuildBoxClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const currentLocation = BAKERY_LOCATIONS.find((l) => l.id === selectedLocation) || BAKERY_LOCATIONS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/98 backdrop-blur-md border-b border-[#E8DFC8] transition-all">
      {/* Top Banner (Levain Signature Midnight Navy & Royal Blue) */}
      {!bannerDismissed && (
        <div className="bg-[#0A1C38] text-white text-xs px-4 py-2 flex items-center justify-between border-b border-[#122646]">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide text-center truncate">
            <span className="font-bold uppercase tracking-wider bg-[#0047FF] text-white px-2 py-0.5 rounded text-[10px] shadow-xs">
              Fresh From NYC
            </span>
            <span className="truncate text-[#E8F0FE]">
              Nationwide shipping via FedEx Express · Hand-packed in signature blue ribbon gift boxes · Free shipping on 8+ packs!
            </span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-white/70 hover:text-white p-1 shrink-0 ml-2"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Fulfillment Mode Selector Bar (Levain Bakery Signature) */}
      <div className="bg-[#FBF8F2] border-b border-[#E8DFC8] px-4 py-1.5 text-xs text-[#556984]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A1C38] hidden sm:inline">
              Delivery Preference:
            </span>
            <div className="inline-flex items-center p-0.5 bg-white rounded-full border border-[#D5CBBA]">
              <button
                type="button"
                onClick={() => onSelectFulfillment('nationwide-shipping')}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  fulfillmentMode === 'nationwide-shipping'
                    ? 'bg-[#0047FF] text-white shadow-xs'
                    : 'text-[#556984] hover:text-[#0A1C38]'
                }`}
              >
                <Truck size={12} />
                <span>Ship Nationwide</span>
              </button>

              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  fulfillmentMode === 'local-pickup'
                    ? 'bg-[#0047FF] text-white shadow-xs'
                    : 'text-[#556984] hover:text-[#0A1C38]'
                }`}
              >
                <Store size={12} />
                <span>Bakery Pickup: {currentLocation.city}</span>
                <ChevronDown size={11} />
              </button>
            </div>
          </div>

          <div className="text-[11px] font-bold text-[#0047FF] hidden md:block">
            {fulfillmentMode === 'nationwide-shipping'
              ? '📦 Ships Fresh Anywhere in US & Canada'
              : `📍 Warm Counter Pickup at ${currentLocation.neighborhood}`}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo in Levain Bakery Style */}
        <a
          href="#"
          className="group flex items-baseline gap-2 text-[#0A1C38] text-2xl sm:text-3xl font-serif tracking-tight whitespace-nowrap shrink-0 hover:text-[#0047FF] transition-colors"
        >
          <span className="font-extrabold">Atelier Levain</span>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#0047FF] bg-[#E8F0FE] px-2 py-0.5 rounded-full border border-[#C5D9FC]">
            Bakery NYC
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#0A1C38]">
          <button
            onClick={onBuildBoxClick}
            className="text-[#0047FF] hover:text-[#0038CC] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer font-extrabold"
          >
            <Sparkles size={14} />
            <span>Build a Box</span>
          </button>
          <a
            href="#products-section"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            Giant 6-oz Cookies
          </a>
          <a
            href="#products-section"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            Gift Tins & Cakes
          </a>
          <a
            href="#reheat-guide"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            Warm & Gooey Ritual
          </a>
          <a
            href="#plans-section"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            The Cookie Club
          </a>
          <a
            href="#reviews-section"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a
            href="#faq-section"
            className="hover:text-[#0047FF] transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBuildBoxClick}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full shadow-md transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            <span>Build Your Box</span>
            <ArrowRight size={13} className="text-[#FFE27D]" />
          </button>

          {/* Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0A1C38] bg-white hover:bg-[#E8F0FE] active:scale-[0.99] rounded-full transition-all border border-[#D5CBBA] whitespace-nowrap shadow-xs cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag size={16} className="text-[#0047FF]" />
            <span className="hidden md:inline font-bold">Bag</span>
            <span className="font-mono text-xs tabular-nums bg-[#0047FF] text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A1C38] hover:text-[#0047FF] rounded-lg border border-[#D5CBBA] bg-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Bakery Location Picker Modal for Local Pickup */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1C38]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E5DCC8] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
              <div className="flex items-center gap-2">
                <Store size={20} className="text-[#0047FF]" />
                <h3 className="font-serif font-bold text-lg text-[#0A1C38]">Select Pickup Bakery</h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="p-1.5 text-[#556984] hover:text-[#0A1C38]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#556984]">
              Giant 6-oz cookies and hearth loaves are baked fresh on the hour at all our bakery flagships for warm counter pickup.
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {BAKERY_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectFulfillment('local-pickup', loc.id);
                    setLocationModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                    selectedLocation === loc.id
                      ? 'border-[#0047FF] bg-[#E8F0FE] ring-2 ring-[#0047FF]'
                      : 'border-[#E5DCC8] bg-[#FAF6EE] hover:border-[#0047FF]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-[#0A1C38]">{loc.city} — {loc.neighborhood}</div>
                    <div className="text-[11px] text-[#556984] flex items-center gap-1">
                      <MapPin size={11} className="text-[#0047FF]" />
                      <span>{loc.address}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-[#0047FF] bg-white px-2 py-0.5 rounded-full border border-[#C5D9FC] shrink-0">
                    Open Today
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8DFC8] flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  onSelectFulfillment('nationwide-shipping');
                  setLocationModalOpen(false);
                }}
                className="text-[#0047FF] font-bold hover:underline"
              >
                Prefer Nationwide Shipping instead?
              </button>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="px-5 py-2 bg-[#0047FF] text-white rounded-full font-bold text-xs hover:bg-[#0038CC] shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6EE] border-b border-[#E8DFC8] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-bold text-[#0A1C38]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBuildBoxClick();
              }}
              className="py-1 text-[#0047FF] text-left font-extrabold flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Build a Cookie Box</span>
            </button>
            <a
              href="#products-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              Giant 6-oz Cookies
            </a>
            <a
              href="#products-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              Gift Tins & Birthday Treats
            </a>
            <a
              href="#reheat-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              Warm & Gooey Reheat Guide
            </a>
            <a
              href="#plans-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              The Cookie Club
            </a>
            <a
              href="#reviews-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              Customer Reviews
            </a>
            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0047FF]"
            >
              Shipping & FAQ
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBuildBoxClick();
            }}
            className="w-full py-3 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] rounded-full uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Build Your Cookie Box</span>
            <ArrowRight size={13} className="text-[#FFE27D]" />
          </button>
        </div>
      )}
    </header>
  );
};

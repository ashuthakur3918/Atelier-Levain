import React, { useState } from 'react';
import { BAKERY_ITEMS } from './data/bakeryData';
import { BakeryItem, CartItem, SlicingOption, SubscriptionPlan, FulfillmentMode, CookieBoxCustomization } from './types/bakery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BuildYourOwnBox } from './components/BuildYourOwnBox';
import { ProductLinesSection } from './components/ProductLinesSection';
import { ReheatGuide } from './components/ReheatGuide';
import { SubscriptionPlansSection } from './components/SubscriptionPlansSection';
import { ComparisonSection } from './components/ComparisonSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      item: BAKERY_ITEMS[0], // Chocolate Chip Walnut Cookie (6 oz)
      quantity: 2,
    },
    {
      item: BAKERY_ITEMS[1], // Two Chip Chocolate Chip (6 oz)
      quantity: 2,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<BakeryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [fulfillmentMode, setFulfillmentMode] = useState<FulfillmentMode>('nationwide-shipping');
  const [selectedLocation, setSelectedLocation] = useState<string>('nyc-uws');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add individual item to cart
  const handleAddToCart = (item: BakeryItem, quantity: number = 1, slicing: SlicingOption = 'sliced-standard') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.slicing === slicing && !ci.customBoxDetails
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { item, quantity, slicing }];
    });
    showToast(`Added ${quantity}x ${item.name} to your bag!`);
  };

  // Quick add (1 item)
  const handleQuickAdd = (item: BakeryItem) => {
    handleAddToCart(item, 1, 'sliced-standard');
  };

  // Add custom build-your-own cookie box
  const handleAddBoxToCart = (boxItem: BakeryItem, customDetails: CookieBoxCustomization) => {
    setCartItems((prev) => [
      ...prev,
      {
        item: boxItem,
        quantity: 1,
        customBoxDetails: customDetails,
      },
    ]);
    showToast(`Added ${boxItem.name} with custom flavors to your bag!`);
    setIsCartOpen(true);
  };

  // Add subscription plan
  const handleSelectPlan = (plan: SubscriptionPlan, slicing: SlicingOption) => {
    const recommended = BAKERY_ITEMS.filter((item) =>
      plan.recommendedItemIds.includes(item.id)
    );
    const itemsToAdd = recommended.length > 0 ? recommended : [BAKERY_ITEMS[0], BAKERY_ITEMS[1]];

    setCartItems((prev) => {
      const next = [...prev];
      itemsToAdd.forEach((item) => {
        const existing = next.find((ci) => ci.item.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          next.push({ item, quantity: 1, slicing });
        }
      });
      return next;
    });

    showToast(`${plan.name} added to your bag!`);
    setIsCartOpen(true);
  };

  // Cart quantity controls
  const handleUpdateQuantity = (itemId: string, slicing: SlicingOption | undefined, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId, slicing);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.item.id === itemId && ci.slicing === slicing
          ? { ...ci, quantity: newQty }
          : ci
      )
    );
  };

  const handleRemoveItem = (itemId: string, slicing: SlicingOption | undefined) => {
    setCartItems((prev) =>
      prev.filter((ci) => !(ci.item.id === itemId && ci.slicing === slicing))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const rawSubtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#0A1C38] antialiased selection:bg-[#E8F0FE] selection:text-[#0047FF]">
      
      {/* Levain Bakery Top Navigation */}
      <Header
        cartCount={totalCartCount}
        cartTotal={rawSubtotal}
        fulfillmentMode={fulfillmentMode}
        selectedLocation={selectedLocation}
        onSelectFulfillment={(mode, locId) => {
          setFulfillmentMode(mode);
          if (locId) setSelectedLocation(locId);
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onBuildBoxClick={() => scrollTo('build-a-box')}
      />

      <main className="flex-1">
        {/* Levain Bakery Signature Hero */}
        <Hero
          onBuildBoxClick={() => scrollTo('build-a-box')}
          onExploreBakes={() => scrollTo('products-section')}
        />

        {/* Levain Bakery Signature Feature: Build Your Own Cookie Box (4, 8, or 12 pk) */}
        <div id="build-a-box">
          <BuildYourOwnBox onAddBoxToCart={handleAddBoxToCart} />
        </div>

        {/* Product Lineup (Giant 6-oz Cookies, Gift Tins, Celebration Treats, Hearth Breads) */}
        <ProductLinesSection
          items={BAKERY_ITEMS}
          onSelectItem={(item) => setModalItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Levain Bakery Warm Cookie Ritual Guide */}
        <div id="reheat-guide">
          <ReheatGuide />
        </div>

        {/* The Cookie Club / Monthly Drops */}
        <SubscriptionPlansSection
          onSelectPlan={handleSelectPlan}
          onTakeQuiz={() => scrollTo('build-a-box')}
        />

        {/* Levain 6-oz vs Grocery Store Cookie Matrix */}
        <ComparisonSection
          onStartQuiz={() => scrollTo('build-a-box')}
        />

        {/* Verified Customer Reviews */}
        <ReviewsSection />

        {/* Nationwide Shipping & Cookie Care FAQ */}
        <FaqSection />
      </main>

      {/* Levain Bakery Navy & Cream Footer */}
      <Footer />

      {/* Product Detail & Nutritional Profile Modal */}
      <ProductModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        fulfillmentMode={fulfillmentMode}
        selectedLocation={selectedLocation}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onBuildBoxClick={() => {
          setIsCartOpen(false);
          scrollTo('build-a-box');
        }}
      />

      {/* Toast Feedback in Levain Signature Navy & Blue */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-[#0A1C38] text-white px-5 py-3.5 rounded-full shadow-2xl border border-[#162E56] flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom-3 duration-200">
          <Check size={16} className="text-[#0047FF]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-1 text-[#4E8CF6] hover:underline font-bold uppercase tracking-wider text-[11px]"
          >
            View Bag →
          </button>
        </div>
      )}

      {/* Mobile Sticky CTA Bar in Levain Royal Blue */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-t border-[#E5DC CE] p-3 px-4 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0047FF] block">
            Nationwide Shipping
          </span>
          <span className="text-xs font-bold text-[#0A1C38]">
            Fresh 6-oz Cookies & Tins
          </span>
        </div>
        <button
          onClick={() => scrollTo('build-a-box')}
          className="px-6 py-2.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.98] rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md"
        >
          <span>Build a Box</span>
          <ArrowRight size={13} />
        </button>
      </div>

    </div>
  );
}

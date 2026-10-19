import React, { useState } from 'react';
import { CartItem, SlicingOption, OrderConfirmation, FulfillmentMode } from '../types/bakery';
import { BAKERY_LOCATIONS } from '../data/bakeryData';
import { BakeryArtwork } from './BakeryArtwork';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Truck, Store, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  fulfillmentMode: FulfillmentMode;
  selectedLocation: string;
  onUpdateQuantity: (itemId: string, slicing: SlicingOption | undefined, newQty: number) => void;
  onRemoveItem: (itemId: string, slicing: SlicingOption | undefined) => void;
  onClearCart: () => void;
  onBuildBoxClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  fulfillmentMode,
  selectedLocation,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBuildBoxClick,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const locationData = BAKERY_LOCATIONS.find((l) => l.id === selectedLocation) || BAKERY_LOCATIONS[0];

  // Financial calculations
  const rawSubtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const shipping = fulfillmentMode === 'local-pickup' || rawSubtotal >= 45 ? 0 : 9.50;
  const finalTotal = Math.round((rawSubtotal + shipping) * 100) / 100;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `LEV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newConfirmation: OrderConfirmation = {
      orderNumber,
      items: [...cartItems],
      subtotal: rawSubtotal,
      shipping,
      total: finalTotal,
      fulfillmentMode,
      selectedBakeryLocation: `${locationData.city} (${locationData.neighborhood})`,
      deliveryDate: 'Thursday, ' + new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      customerName: customerName || 'Camille Laurent',
      customerEmail: customerEmail || 'camille@example.com',
      customerAddress: customerAddress || '742 Evergreen Terrace, New York, NY',
      giftNote: giftNote,
      placedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedOrder(newConfirmation);
    setStep('receipt');
    onClearCart();
  };

  const handleReset = () => {
    setStep('cart');
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5DCC8] shadow-2xl flex flex-col justify-between relative z-10">
          
          {/* Header in Levain Midnight Navy */}
          <div className="p-6 border-b border-[#1A3158] bg-[#0A1C38] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#0047FF]" />
                <h2 className="text-xl font-serif font-bold text-white">
                  {step === 'cart'
                    ? 'Your Bakery Bag'
                    : step === 'checkout'
                    ? 'Shipping & Recipient Details'
                    : 'Order Confirmed!'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Delivery vs Pickup Status Indicator */}
            <div className="mt-3 p-2 bg-[#122646] rounded-xl text-xs flex items-center justify-between border border-[#213C68]">
              <span className="flex items-center gap-1.5 font-bold text-white">
                {fulfillmentMode === 'nationwide-shipping' ? (
                  <>
                    <Truck size={14} className="text-[#4E8CF6]" />
                    <span>Nationwide FedEx Express</span>
                  </>
                ) : (
                  <>
                    <Store size={14} className="text-[#4E8CF6]" />
                    <span>Pickup: {locationData.city}</span>
                  </>
                )}
              </span>
              <span className="font-mono text-[10px] text-[#A6C4EE]">
                {fulfillmentMode === 'nationwide-shipping' ? '2-Day Express' : 'Same-Day Ready'}
              </span>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Step 1: Cart View */}
            {step === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#0A1C38]">
                      <ShoppingBag size={28} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-serif font-bold text-[#0A1C38]">Your bag is currently empty</h3>
                      <p className="text-xs text-[#556984] max-w-xs mx-auto">
                        Build a custom cookie box or choose from our legendary 6-oz giant cookies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onBuildBoxClick();
                      }}
                      className="px-6 py-3 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] rounded-full uppercase tracking-wider shadow-md"
                    >
                      Build Your Own Cookie Box
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    
                    {/* Free shipping progress bar */}
                    <div className="p-3 bg-[#E8F0FE] rounded-2xl border border-[#C5D9FC] text-xs space-y-1.5">
                      <div className="flex justify-between font-bold">
                        <span className="text-[#0A1C38]">
                          {rawSubtotal >= 45 ? '🎉 You unlocked Free Express Shipping!' : `Add $${(45 - rawSubtotal).toFixed(2)} more for Free Shipping`}
                        </span>
                        <span className="text-[#0047FF]">{rawSubtotal >= 45 ? 'FREE' : '$9.50'}</span>
                      </div>
                      <div className="w-full bg-[#C5D9FC] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0047FF] h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, (rawSubtotal / 45) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Itemized List */}
                    <div className="space-y-3">
                      {cartItems.map((cartItem) => {
                        const { item, quantity, slicing, customBoxDetails } = cartItem;
                        return (
                          <div
                            key={`${item.id}-${slicing}`}
                            className="p-3.5 bg-white rounded-2xl border border-[#E5DCC8] flex items-start justify-between gap-3 shadow-2xs"
                          >
                            {/* Artwork Thumbnail */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E5DCC8] bg-[#FAF6EE]">
                              <BakeryArtwork type={item.artworkType} className="w-full h-full object-cover" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <h4 className="text-xs font-bold text-[#0A1C38] truncate">
                                {item.name}
                              </h4>
                              <div className="text-[11px] text-[#7A8EAA]">
                                {item.weight}
                              </div>

                              {customBoxDetails && (
                                <div className="text-[10px] text-[#4A5D78] bg-[#FAF6EE] p-1.5 rounded-lg mt-1 space-y-0.5 border border-[#E8DFC8]">
                                  <div className="font-semibold text-[#0047FF]">
                                    {customBoxDetails.boxStyle === 'signature-blue-ribbon' ? 'Signature Blue Ribbon' : 'Celebration Tin'}
                                  </div>
                                  <div className="truncate">
                                    {Object.entries(customBoxDetails.selectedItems)
                                      .filter(([_, qty]) => qty > 0)
                                      .map(([id, qty]) => `${qty}x`)
                                      .join(' + ')}
                                  </div>
                                  {customBoxDetails.giftNote && (
                                    <div className="italic text-[#0A1C38]">"{customBoxDetails.giftNote}"</div>
                                  )}
                                </div>
                              )}

                              {slicing && item.category === 'breads' && (
                                <span className="inline-block text-[10px] bg-[#E8F0FE] text-[#0047FF] px-2 py-0.5 rounded-md mt-1 font-semibold">
                                  {slicing === 'sliced-standard' ? 'Sliced 12mm' : slicing === 'sliced-thick' ? 'Thick 18mm' : 'Whole Loaf'}
                                </span>
                              )}

                              <div className="font-bold text-xs text-[#0A1C38] pt-1">
                                ${(item.price * quantity).toFixed(2)}
                              </div>
                            </div>

                            {/* Stepper & Trash */}
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <button
                                onClick={() => onRemoveItem(item.id, slicing)}
                                className="text-[#99A8BC] hover:text-[#E64A38] p-1 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>

                              <div className="flex items-center gap-1.5 bg-[#FAF6EE] p-1 rounded-lg border border-[#D5CBBA]">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, slicing, quantity - 1)}
                                  className="p-1 text-[#556984] hover:text-[#0047FF] disabled:opacity-40"
                                  disabled={quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="w-5 text-center text-xs font-bold font-mono">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, slicing, quantity + 1)}
                                  className="p-1 text-[#556984] hover:text-[#0047FF]"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add More button */}
                    <button
                      onClick={() => {
                        onClose();
                        onBuildBoxClick();
                      }}
                      className="w-full py-2.5 text-xs font-bold text-[#0047FF] bg-[#E8F0FE] hover:bg-[#D5E4FD] rounded-xl transition-colors border border-[#C5D9FC]"
                    >
                      + Add Another Custom Cookie Box
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Shipping Form */}
            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38]">
                    Recipient Contact
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF6EE] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address (for FedEx tracking updates)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF6EE] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                  />
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38]">
                    {fulfillmentMode === 'nationwide-shipping' ? 'Shipping Address' : 'Contact Phone for Counter Pickup'}
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={fulfillmentMode === 'nationwide-shipping' ? 'Street Address, City, State, ZIP' : 'Mobile Phone'}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF6EE] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                  />
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A1C38]">
                    Handwritten Gift Note (Optional)
                  </span>
                  <textarea
                    rows={2}
                    placeholder="Message to write on our signature bakery card..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF6EE] border border-[#D5CBBA] rounded-xl text-[#0A1C38] focus:outline-none focus:border-[#0047FF]"
                  />
                </div>

                <div className="p-3 bg-[#E8F0FE] rounded-2xl border border-[#C5D9FC] text-xs space-y-1 text-[#334661]">
                  <div className="flex items-center gap-1.5 font-bold text-[#0047FF]">
                    <ShieldCheck size={14} />
                    <span>Levain Freshness Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Cookies are baked fresh the morning of dispatch and sealed in protective food-grade wraps. Arrives warmable and delicious.
                  </p>
                </div>
              </form>
            )}

            {/* Step 3: Receipt View */}
            {step === 'receipt' && confirmedOrder && (
              <div className="space-y-6 py-2">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF5E9] text-[#287A2E] flex items-center justify-center">
                    <CheckCircle2 size={34} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#0A1C38]">Cookies on the Way!</h3>
                  <p className="text-xs text-[#556984]">
                    Your order is confirmed. Fresh baking begins before dawn.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-[#FAF6EE] rounded-2xl p-5 border border-[#E5DCC8] space-y-4">
                  <div className="flex justify-between pb-3 border-b border-[#E8DFC8] text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7A8EAA] block">Order Identifier</span>
                      <span className="font-mono font-bold text-[#0A1C38]">{confirmedOrder.orderNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#7A8EAA] block">Estimated Arrival</span>
                      <span className="font-bold text-[#0047FF]">{confirmedOrder.deliveryDate}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#4A5D78]">
                    <div className="flex justify-between">
                      <span className="text-[#6A7E99]">Recipient:</span>
                      <span className="font-bold text-[#0A1C38]">{confirmedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6A7E99]">Fulfillment:</span>
                      <span className="font-medium text-[#0A1C38]">
                        {confirmedOrder.fulfillmentMode === 'nationwide-shipping' ? 'FedEx Express 2-Day' : `Bakery Pickup (${confirmedOrder.selectedBakeryLocation})`}
                      </span>
                    </div>
                    {confirmedOrder.giftNote && (
                      <div className="pt-2 border-t border-[#E8DFC8] text-[11px] italic text-[#0047FF]">
                        "{confirmedOrder.giftNote}"
                      </div>
                    )}
                  </div>

                  {/* Lines */}
                  <div className="pt-3 border-t border-[#E8DFC8] space-y-1.5 text-xs">
                    {confirmedOrder.items.map((ci, i) => (
                      <div key={i} className="flex justify-between text-[#556984]">
                        <span>{ci.quantity}x {ci.item.name}</span>
                        <span className="font-mono tabular-nums">${(ci.item.price * ci.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t border-[#E8DFC8] font-bold text-[#0A1C38] text-sm">
                      <span>Total:</span>
                      <span className="font-mono tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] rounded-full uppercase tracking-wider transition-colors shadow-md"
                >
                  Return to Bakery Home
                </button>
              </div>
            )}

          </div>

          {/* Sticky Bottom Actions */}
          {cartItems.length > 0 && step !== 'receipt' && (
            <div className="p-6 bg-[#FAF6EE] border-t border-[#E8DFC8] space-y-3">
              <div className="space-y-1 text-xs text-[#556984]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${rawSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#0047FF] font-bold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#0A1C38] pt-2 border-t border-[#E8DFC8]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums text-xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md cursor-pointer"
                >
                  <span>Proceed to Shipping & Gifting</span>
                  <ArrowRight size={14} className="text-[#FFE27D]" />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="py-3 px-4 text-xs font-bold text-[#0A1C38] bg-white border border-[#D5CBBA] rounded-full hover:bg-[#E8F0FE]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 text-xs font-bold text-white bg-[#0047FF] hover:bg-[#0038CC] active:scale-[0.99] rounded-full transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <span>Place Order & Ship</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

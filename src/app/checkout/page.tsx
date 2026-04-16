import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  // NOTE: Shopify Checkout handles the actual payment flow via cart.checkoutUrl
  // This page is a pre-checkout form for address/delivery before handing off to Shopify

  return (
    <div className="max-w-[1200px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      <h1 className="type-headline mb-12">
        Checkout
      </h1>

      <div className="grid grid-cols-[1fr_380px] gap-20 max-md:grid-cols-1 max-md:gap-12">
        {/* Left — forms */}
        <div>
          {/* Shipping */}
          <section className="mb-12">
            <p className="type-label mb-8 pb-4 border-b border-surface-high">
              Shipping Address
            </p>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { label: 'First Name', col: 1 },
                { label: 'Last Name', col: 1 },
                { label: 'Email Address', col: 2 },
                { label: 'Phone Number', col: 2 },
                { label: 'Address Line 1', col: 2 },
                { label: 'Address Line 2 (optional)', col: 2 },
                { label: 'City', col: 1 },
                { label: 'Province / Region', col: 1 },
                { label: 'Country', col: 1 },
                { label: 'Postal Code', col: 1 },
              ].map((field) => (
                <div key={field.label} className={field.col === 2 ? 'col-span-2' : 'col-span-1'}>
                  <label className="type-label block text-on-surface-variant mb-2">
                    {field.label}
                  </label>
                  <input className="input-line" placeholder=" " />
                </div>
              ))}
            </div>
          </section>

          {/* Delivery method */}
          <section className="mb-12">
            <p className="type-label mb-8 pb-4 border-b border-surface-high">
              Delivery Method
            </p>
            <div className="flex flex-col gap-4">
              {[
                { id: 'standard', label: 'Standard Delivery', detail: '3–5 working days', price: 'Rp 25.000' },
                { id: 'express', label: 'Express Delivery', detail: '1–2 working days', price: 'Rp 50.000' },
              ].map((option) => (
                <label key={option.id} className="flex items-center gap-4 p-5 bg-surface-low cursor-pointer">
                  <input type="radio" name="delivery" value={option.id} defaultChecked={option.id === 'standard'} />
                  <div className="flex-1">
                    <p className="font-semibold text-[0.9375rem] m-0 mb-1">{option.label}</p>
                    <p className="text-[0.8125rem] text-on-surface-variant m-0">{option.detail}</p>
                  </div>
                  <span className="font-semibold text-sm">{option.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <p className="type-label mb-8 pb-4 border-b border-surface-high">
              Payment
            </p>
            <div className="grid gap-6">
              <div>
                <label className="type-label block text-on-surface-variant mb-2">
                  Card Number
                </label>
                <input className="input-line" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="type-label block text-on-surface-variant mb-2">
                    Expiry Date
                  </label>
                  <input className="input-line" placeholder="MM / YY" />
                </div>
                <div>
                  <label className="type-label block text-on-surface-variant mb-2">
                    CVV
                  </label>
                  <input className="input-line" placeholder="•••" />
                </div>
              </div>
              <div>
                <label className="type-label block text-on-surface-variant mb-2">
                  Name on Card
                </label>
                <input className="input-line" placeholder="As it appears on your card" />
              </div>
            </div>
            <p className="text-xs text-outline mt-4">
              Payments processed securely via Stripe. Card details are never stored on our servers.
            </p>
          </section>
        </div>

        {/* Right — order summary */}
        <div>
          <div className="bg-surface-low p-8 sticky top-20">
            <p className="type-label mb-6">Order Summary</p>

            {/* Items placeholder */}
            <div className="mb-6 border-b border-surface-high pb-6">
              <p className="text-sm text-on-surface-variant">No items in cart</p>
            </div>

            {/* Promo */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input className="input-line flex-1" placeholder="Promo code" />
                <button className="btn-secondary px-3.5 py-[0.4rem] text-[0.65rem]">
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="text-sm flex flex-col gap-3 mb-6">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span><span>—</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span><span>Rp 25.000</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-3 border-t border-surface-high">
                <span>Total</span><span>—</span>
              </div>
            </div>

            <button className="btn-primary w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  // NOTE: Shopify Checkout handles the actual payment flow via cart.checkoutUrl
  // This page is a pre-checkout form for address/delivery before handing off to Shopify

  return (
    <div className="mob-pad mob-sm-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 5rem' }}>
      <h1 className="type-headline" style={{ marginBottom: '3rem' }}>
        Checkout
      </h1>

      <div className="mob-t-1col" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '5rem' }}>
        {/* Left — forms */}
        <div>
          {/* Shipping */}
          <section style={{ marginBottom: '3rem' }}>
            <p className="type-label" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
              Shipping Address
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
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
                <div
                  key={field.label}
                  style={{ gridColumn: field.col === 2 ? 'span 2' : 'span 1' }}
                >
                  <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                    {field.label}
                  </label>
                  <input className="input-line" placeholder=" " />
                </div>
              ))}
            </div>
          </section>

          {/* Delivery method */}
          <section style={{ marginBottom: '3rem' }}>
            <p className="type-label" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
              Delivery Method
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { id: 'standard', label: 'Standard Delivery', detail: '3–5 working days', price: 'Rp 25.000' },
                { id: 'express', label: 'Express Delivery', detail: '1–2 working days', price: 'Rp 50.000' },
              ].map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    backgroundColor: '#f3f3f3',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="delivery" value={option.id} defaultChecked={option.id === 'standard'} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.25rem' }}>{option.label}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#474747', margin: 0 }}>{option.detail}</p>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{option.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <p className="type-label" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
              Payment
            </p>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                  Card Number
                </label>
                <input className="input-line" placeholder="1234 5678 9012 3456" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                    Expiry Date
                  </label>
                  <input className="input-line" placeholder="MM / YY" />
                </div>
                <div>
                  <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                    CVV
                  </label>
                  <input className="input-line" placeholder="•••" />
                </div>
              </div>
              <div>
                <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                  Name on Card
                </label>
                <input className="input-line" placeholder="As it appears on your card" />
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '1rem' }}>
              Payments processed securely via Stripe. Card details are never stored on our servers.
            </p>
          </section>
        </div>

        {/* Right — order summary */}
        <div>
          <div
            style={{
              backgroundColor: '#f3f3f3',
              padding: '2rem',
              position: 'sticky',
              top: '5rem',
            }}
          >
            <p className="type-label" style={{ marginBottom: '1.5rem' }}>Order Summary</p>

            {/* Items placeholder */}
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e8e8e8', paddingBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#474747' }}>No items in cart</p>
            </div>

            {/* Promo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input className="input-line" placeholder="Promo code" style={{ flex: 1 }} />
                <button className="btn-secondary" style={{ padding: '0.4rem 0.875rem', fontSize: '0.65rem' }}>
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#474747' }}>Subtotal</span><span>—</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#474747' }}>Shipping</span><span>Rp 25.000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e8e8e8' }}>
                <span>Total</span><span>—</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

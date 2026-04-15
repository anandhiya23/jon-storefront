import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cart',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  // Cart state lives in Zustand (client-side) — this is a server page shell
  // CartContent is a client component that reads from the store
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '4rem 5rem' }}>
      <h1 className="type-headline" style={{ marginBottom: '3rem' }}>
        Your Cart
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '5rem' }}>
        {/* Line items */}
        <div>
          {/* Empty state */}
          <div
            style={{
              padding: '5rem 0',
              borderTop: '1px solid #e8e8e8',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#474747', marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>

          {/* TODO: Map over cart.lines.nodes when wired to Zustand store
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))} */}
        </div>

        {/* Summary */}
        <div>
          <div
            style={{
              backgroundColor: '#f3f3f3',
              padding: '2rem',
            }}
          >
            <p className="type-label" style={{ marginBottom: '2rem' }}>Order Summary</p>

            {/* Promo code */}
            <div style={{ marginBottom: '2rem' }}>
              <p className="type-label" style={{ color: '#777', marginBottom: '0.75rem' }}>
                Promo Code
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  className="input-line"
                  placeholder="Enter code"
                  style={{ flex: 1 }}
                />
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '1.5rem' }}>
              {[
                { label: 'Subtotal', value: '—' },
                { label: 'Shipping', value: 'Calculated at checkout' },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ color: '#474747' }}>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e8e8e8',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                <span>Total</span>
                <span>—</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', display: 'flex' }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

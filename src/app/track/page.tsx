import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Order',
  alternates: { canonical: '/track' },
}

const STEPS = ['Order Placed', 'Confirmed', 'Shipped', 'Delivered']

export default function TrackOrderPage() {
  const exampleCurrentStep = 2 // Show example result in "Shipped" state

  return (
    <div className="mob-pad mob-sm-pad" style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 5rem' }}>
      {/* Hero header */}
      <h1
        className="type-display"
        style={{
          marginBottom: '1rem',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        }}
      >
        Track Your Order
      </h1>
      <p style={{ color: '#474747', marginBottom: '3rem', fontSize: '1rem' }}>
        Enter your order code to see real-time status and delivery details.
      </p>

      {/* Search form */}
      <form
        className="mob-track-form"
        style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', alignItems: 'flex-end' }}
      >
        <div style={{ flex: 1 }}>
          <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
            Order Code
          </label>
          <input
            className="input-line"
            placeholder="e.g. JON-2025-00042"
            style={{ fontSize: '1.0625rem' }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
          Search
        </button>
      </form>

      {/* Example result */}
      <div style={{ borderTop: '2px solid #000', paddingTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
          <div>
            <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>Order</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>JON-2025-00042</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>Est. Delivery</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>16–17 April 2025</p>
          </div>
        </div>

        {/* Status tracker */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: i <= exampleCurrentStep ? '#000' : '#c6c6c6',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="type-label"
                    style={{
                      color: i <= exampleCurrentStep ? '#000' : '#777',
                      whiteSpace: 'nowrap',
                      fontSize: '0.65rem',
                    }}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor: i < exampleCurrentStep ? '#000' : '#e8e8e8',
                      margin: '-1rem 0.75rem 0',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="type-label" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
            Items in this Order
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'JON Performance Tee', variant: 'Black / M', qty: 1, price: 'Rp 599.000' },
              { name: 'JON Training Shorts', variant: 'Black / L', qty: 1, price: 'Rp 599.000' },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, margin: '0 0 0.2rem' }}>{item.name}</p>
                  <p className="type-label" style={{ color: '#777', margin: 0 }}>{item.variant} · Qty {item.qty}</p>
                </div>
                <span style={{ fontWeight: 600 }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping address */}
        <div>
          <p className="type-label" style={{ marginBottom: '1rem' }}>Shipping To</p>
          <p style={{ fontSize: '0.875rem', color: '#474747', lineHeight: 1.7, margin: 0 }}>
            Bintang Anandhiya — Jl. Sudirman No. 12, Jakarta Selatan 12190, Indonesia
          </p>
        </div>
      </div>
    </div>
  )
}

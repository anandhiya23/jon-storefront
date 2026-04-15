import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Order ${id}`,
    robots: { index: false, follow: false },
  }
}

const STEPS = ['Order Placed', 'Confirmed', 'Shipped', 'Delivered']

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const currentStep = 2 // 0-indexed: Shipped

  return (
    <div>
      <Link
        href="/account/orders"
        className="type-label"
        style={{ color: '#777', textDecoration: 'none', borderBottom: '1px solid #777', display: 'inline-block', marginBottom: '2.5rem' }}
      >
        ← All Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
        <h1 className="type-headline">{id}</h1>
        <span className="type-label" style={{ color: '#474747' }}>12 April 2025</span>
      </div>

      {/* Status tracker */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: i <= currentStep ? '#000' : '#c6c6c6',
                    flexShrink: 0,
                  }}
                />
                <span
                  className="type-label"
                  style={{
                    color: i <= currentStep ? '#000' : '#777',
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
                    height: '1px',
                    backgroundColor: i < currentStep ? '#000' : '#c6c6c6',
                    margin: '-0.75rem 0.5rem 0',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <section style={{ marginBottom: '3rem' }}>
        <p className="type-label" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
          Items
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { name: 'JON Performance Tee', variant: 'Black / M', qty: 1, price: 'Rp 599.000' },
            { name: 'JON Training Shorts', variant: 'Black / L', qty: 1, price: 'Rp 599.000' },
          ].map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '64px', height: '64px', backgroundColor: '#e8e8e8', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.25rem' }}>{item.name}</p>
                <p className="type-label" style={{ color: '#777', margin: 0 }}>{item.variant} · Qty {item.qty}</p>
              </div>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Shipping */}
        <div>
          <p className="type-label" style={{ marginBottom: '1rem' }}>Shipping Address</p>
          <p style={{ fontSize: '0.875rem', color: '#474747', lineHeight: 1.7, margin: 0 }}>
            Bintang Anandhiya<br />
            Jl. Sudirman No. 12<br />
            Jakarta Selatan 12190<br />
            Indonesia
          </p>
        </div>

        {/* Totals */}
        <div>
          <p className="type-label" style={{ marginBottom: '1rem' }}>Order Total</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#474747' }}>Subtotal</span><span>Rp 1.198.000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#474747' }}>Shipping</span><span>Rp 25.000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e8e8e8' }}>
              <span>Total</span><span>Rp 1.223.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

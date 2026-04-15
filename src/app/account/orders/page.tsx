import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order History',
  robots: { index: false, follow: false },
}

const STATUS_COLORS: Record<string, string> = {
  Processing: '#474747',
  Shipped: '#000',
  Delivered: '#000',
  Returned: '#ba1a1a',
}

export default function OrderHistoryPage() {
  // TODO: fetch orders via GET_CUSTOMER query

  const placeholderOrders = [
    { number: 'JON-2025-00042', date: '12 April 2025', status: 'Shipped', total: 'Rp 1.198.000', items: 2 },
    { number: 'JON-2025-00031', date: '28 March 2025', status: 'Delivered', total: 'Rp 599.000', items: 1 },
    { number: 'JON-2025-00018', date: '5 March 2025', status: 'Delivered', total: 'Rp 899.000', items: 1 },
  ]

  return (
    <div>
      <h1 className="type-headline" style={{ marginBottom: '3rem' }}>Order History</h1>

      {placeholderOrders.length === 0 ? (
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
          <p style={{ color: '#474747', marginBottom: '2rem' }}>No orders yet.</p>
          <Link href="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#e8e8e8' }}>
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
              gap: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f3f3f3',
            }}
          >
            {['Order', 'Date', 'Status', 'Total', ''].map((h) => (
              <span key={h} className="type-label" style={{ color: '#777' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {placeholderOrders.map((order) => (
            <div
              key={order.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                backgroundColor: '#fff',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.2rem' }}>{order.number}</p>
                <p className="type-label" style={{ color: '#777', margin: 0 }}>{order.items} item{order.items > 1 ? 's' : ''}</p>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#474747', margin: 0 }}>{order.date}</p>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: STATUS_COLORS[order.status] ?? '#474747',
                  margin: 0,
                }}
              >
                {order.status}
              </p>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: 0 }}>{order.total}</p>
              <Link
                href={`/account/orders/${order.number}`}
                className="type-label"
                style={{ color: '#1b1b1b', textDecoration: 'none', borderBottom: '1px solid #777' }}
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

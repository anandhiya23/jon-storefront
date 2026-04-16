import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  customerAccountFetch,
  GET_CUSTOMER_ORDERS,
  orderGidToParam,
  type CAOrder,
} from '@/lib/shopify/customer-account'
import { formatPrice, formatDate, getOrderStatusLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Order History',
  robots: { index: false, follow: false },
}

const STATUS_CLASSES: Record<string, string> = {
  Processing: 'text-on-surface-variant',
  'Partially Shipped': 'text-on-surface-variant',
  Preparing: 'text-on-surface-variant',
  Shipped: 'text-black',
  Delivered: 'text-black',
  Returned: 'text-error',
}

export default async function OrderHistoryPage() {
  const session = await getServerSession(authOptions)
  const data = await customerAccountFetch<{ customer: { orders: { nodes: CAOrder[] } } }>(
    session!.accessToken!,
    GET_CUSTOMER_ORDERS,
  )
  const orders = data.customer.orders.nodes

  return (
    <div>
      <h1 className="type-headline mb-12">Order History</h1>

      {orders.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-on-surface-variant mb-8">No orders yet.</p>
          <Link href="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-surface-high">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 bg-surface-low">
            {['Order', 'Date', 'Status', 'Total', ''].map((h) => (
              <span key={h} className="type-label text-outline">{h}</span>
            ))}
          </div>

          {/* Rows */}
          {orders.map((order) => {
            const status = getOrderStatusLabel(order.fulfillmentStatus)
            const itemCount = order.lineItems.nodes.reduce((s, l) => s + l.quantity, 0)
            return (
              <div
                key={order.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-6 py-5 bg-white items-center"
              >
                <div>
                  <p className="font-semibold text-[0.9375rem] m-0 mb-[0.2rem]">#{order.number}</p>
                  <p className="type-label text-outline m-0">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                </div>
                <p className="text-sm text-on-surface-variant m-0">{formatDate(order.processedAt)}</p>
                <p className={`text-xs font-bold tracking-[0.08em] uppercase m-0 ${STATUS_CLASSES[status] ?? 'text-on-surface-variant'}`}>
                  {status}
                </p>
                <p className="font-semibold text-[0.9375rem] m-0">
                  {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                </p>
                <Link
                  href={`/account/orders/${orderGidToParam(order.id)}`}
                  className="type-label text-on-surface no-underline border-b border-outline"
                >
                  Details
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

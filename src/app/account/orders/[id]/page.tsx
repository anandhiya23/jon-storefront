import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  customerAccountFetch,
  GET_CUSTOMER_ORDER,
  paramToOrderGid,
  type CAOrder,
} from '@/lib/shopify/customer-account'
import { formatPrice, formatDate, getOrderStatusLabel } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Order #${id}`,
    robots: { index: false, follow: false },
  }
}

const STEPS = ['Order Placed', 'Confirmed', 'Shipped', 'Delivered']
const STEP_MAP: Record<string, number> = {
  UNFULFILLED: 1,
  PENDING_FULFILLMENT: 1,
  IN_PROGRESS: 1,
  PARTIALLY_FULFILLED: 2,
  FULFILLED: 2,
  // financial PAID = delivered approximation
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const data = await customerAccountFetch<{ order: CAOrder | null }>(
    session!.accessToken!,
    GET_CUSTOMER_ORDER,
    { id: paramToOrderGid(id) },
  ).catch(() => ({ order: null }))

  if (!data.order) notFound()
  const order = data.order

  const fulfillStatus = getOrderStatusLabel(order.fulfillmentStatus)
  const isPaid = order.financialStatus === 'PAID'
  const currentStep = isPaid && fulfillStatus === 'Delivered' ? 3
    : fulfillStatus === 'Shipped' ? 2
    : STEP_MAP[order.fulfillmentStatus] ?? 1

  const addr = order.shippingAddress

  return (
    <div>
      <Link
        href="/account/orders"
        className="type-label text-outline no-underline border-b border-outline inline-block mb-10"
      >
        ← All Orders
      </Link>

      <div className="flex justify-between items-baseline mb-12">
        <h1 className="type-headline">Order #{order.number}</h1>
        <span className="type-label text-on-surface-variant">{formatDate(order.processedAt)}</span>
      </div>

      {/* Status tracker */}
      <div className="mb-16">
        <div className="flex items-center">
          {STEPS.map((step, i) => (
            <div key={step} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-3 h-3 shrink-0 ${i <= currentStep ? 'bg-black' : 'bg-outline-variant'}`} />
                <span className={`type-label whitespace-nowrap text-[0.65rem] ${i <= currentStep ? 'text-black' : 'text-outline'}`}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 -mt-3 ${i < currentStep ? 'bg-black' : 'bg-outline-variant'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <section className="mb-12">
        <p className="type-label mb-6 pb-4 border-b border-surface-high">Items</p>
        <div className="flex flex-col gap-5">
          {order.lineItems.nodes.map((item, i) => (
            <div key={i} className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-surface-high shrink-0 relative overflow-hidden">
                {item.image && (
                  <Image src={item.image.url} alt={item.image.altText ?? item.title} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[0.9375rem] m-0 mb-1">{item.title}</p>
                <p className="type-label text-outline m-0">
                  {item.variantTitle ?? ''}
                  {item.variantTitle ? ' · ' : ''}
                  Qty {item.quantity}
                </p>
              </div>
              {item.price && (
                <p className="font-semibold text-[0.9375rem]">
                  {formatPrice(item.price.amount, item.price.currencyCode)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-12 max-sm:grid-cols-1">
        {/* Shipping */}
        <div>
          <p className="type-label mb-4">Shipping Address</p>
          {addr ? (
            <p className="text-sm text-on-surface-variant leading-[1.7] m-0">
              {[addr.firstName, addr.lastName].filter(Boolean).join(' ')}<br />
              {addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}<br />
              {[addr.city, addr.province, addr.zip].filter(Boolean).join(', ')}<br />
              {addr.country}
            </p>
          ) : (
            <p className="text-sm text-on-surface-variant">—</p>
          )}
        </div>

        {/* Totals */}
        <div>
          <p className="type-label mb-4">Order Total</p>
          <div className="flex flex-col gap-3 text-sm">
            {order.subtotalPrice && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span>{formatPrice(order.subtotalPrice.amount, order.subtotalPrice.currencyCode)}</span>
              </div>
            )}
            {order.totalShippingPrice && (
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span>{formatPrice(order.totalShippingPrice.amount, order.totalShippingPrice.currencyCode)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-3 border-t border-surface-high">
              <span>Total</span>
              <span>{formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

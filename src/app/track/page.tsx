import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Order',
  alternates: { canonical: '/track' },
}

const STEPS = ['Order Placed', 'Confirmed', 'Shipped', 'Delivered']

export default function TrackOrderPage() {
  const exampleCurrentStep = 2 // Show example result in "Shipped" state

  return (
    <div className="max-w-[800px] mx-auto py-24 px-20 max-md:px-10 max-sm:px-6">
      {/* Hero header */}
      <h1 className="type-display mb-4 text-[clamp(2.5rem,5vw,3.5rem)]">
        Track Your Order
      </h1>
      <p className="text-on-surface-variant mb-12 text-base">
        Enter your order code to see real-time status and delivery details.
      </p>

      {/* Search form */}
      <form className="flex gap-4 mb-20 items-end max-sm:flex-col max-sm:items-stretch">
        <div className="flex-1">
          <label className="type-label block text-on-surface-variant mb-2">
            Order Code
          </label>
          <input
            className="input-line text-[1.0625rem]"
            placeholder="e.g. JON-2025-00042"
          />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          Search
        </button>
      </form>

      {/* Example result */}
      <div className="border-t-2 border-black pt-12">
        <div className="flex justify-between items-baseline mb-10">
          <div>
            <p className="type-label text-outline mb-[0.4rem]">Order</p>
            <p className="text-lg font-bold m-0">JON-2025-00042</p>
          </div>
          <div className="text-right">
            <p className="type-label text-outline mb-[0.4rem]">Est. Delivery</p>
            <p className="text-[0.9375rem] font-semibold m-0">16–17 April 2025</p>
          </div>
        </div>

        {/* Status tracker */}
        <div className="mb-16">
          <div className="flex items-start">
            {STEPS.map((step, i) => (
              <div key={step} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-3.5 h-3.5 shrink-0 ${i <= exampleCurrentStep ? 'bg-black' : 'bg-outline-variant'}`} />
                  <span className={`type-label whitespace-nowrap text-[0.65rem] ${i <= exampleCurrentStep ? 'text-black' : 'text-outline'}`}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 -mt-4 ${i < exampleCurrentStep ? 'bg-black' : 'bg-surface-high'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="mb-12">
          <p className="type-label mb-6 pb-4 border-b border-surface-high">
            Items in this Order
          </p>
          <div className="flex flex-col gap-4">
            {[
              { name: 'JON Performance Tee', variant: 'Black / M', qty: 1, price: 'Rp 599.000' },
              { name: 'JON Training Shorts', variant: 'Black / L', qty: 1, price: 'Rp 599.000' },
            ].map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold m-0 mb-[0.2rem]">{item.name}</p>
                  <p className="type-label text-outline m-0">{item.variant} · Qty {item.qty}</p>
                </div>
                <span className="font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping address */}
        <div>
          <p className="type-label mb-4">Shipping To</p>
          <p className="text-sm text-on-surface-variant leading-[1.7] m-0">
            Bintang Anandhiya — Jl. Sudirman No. 12, Jakarta Selatan 12190, Indonesia
          </p>
        </div>
      </div>
    </div>
  )
}

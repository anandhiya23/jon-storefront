import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  customerAccountFetch,
  GET_CUSTOMER_PROFILE,
  type CACustomer,
} from '@/lib/shopify/customer-account'

export const metadata: Metadata = {
  title: 'My Profile',
  robots: { index: false, follow: false },
}

export default async function AccountProfilePage() {
  const session = await getServerSession(authOptions)
  const data = await customerAccountFetch<{ customer: CACustomer }>(
    session!.accessToken!,
    GET_CUSTOMER_PROFILE,
  )
  const customer = data.customer
  const addresses = customer.addresses.nodes

  return (
    <div>
      <h1 className="type-headline mb-12">Profile</h1>

      {/* Personal info */}
      <section className="mb-16">
        <p className="type-label mb-8 pb-4 border-b border-surface-high">
          Personal Information
        </p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { label: 'First Name', value: customer.firstName ?? '' },
            { label: 'Last Name', value: customer.lastName ?? '' },
            { label: 'Email Address', value: customer.emailAddress?.emailAddress ?? '', col: 2 },
            { label: 'Phone Number', value: customer.phoneNumber?.phoneNumber ?? '', col: 2 },
          ].map((field) => (
            <div key={field.label} className={(field as { col?: number }).col === 2 ? 'col-span-2' : 'col-span-1'}>
              <label className="type-label block text-on-surface-variant mb-2">
                {field.label}
              </label>
              <input className="input-line" defaultValue={field.value} readOnly />
            </div>
          ))}
        </div>
        <p className="text-xs text-outline mt-6">
          To update personal info, visit your Shopify account settings.
        </p>
      </section>

      {/* Address book */}
      <section>
        <p className="type-label mb-8 pb-4 border-b border-surface-high">
          Address Book
        </p>

        {addresses.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No saved addresses.</p>
        ) : (
          <div className="flex flex-col gap-6 mb-8">
            {addresses.map((addr, i) => {
              const isDefault = addr.id === customer.defaultAddress?.id
              const name = [addr.firstName, addr.lastName].filter(Boolean).join(' ')
              const line = [addr.address1, addr.address2].filter(Boolean).join(', ')
              const cityLine = [addr.city, addr.province, addr.zip, addr.country].filter(Boolean).join(', ')
              return (
                <div key={addr.id ?? i} className="p-6 bg-surface-low flex justify-between items-start">
                  <div>
                    {isDefault && (
                      <span className="type-label bg-black text-on-primary px-2 py-[0.2rem] text-[0.65rem] mb-3 inline-block">
                        Default
                      </span>
                    )}
                    <p className="font-semibold text-[0.9375rem] m-0 mb-1">{name}</p>
                    {line && <p className="text-sm text-on-surface-variant m-0 mb-[0.2rem]">{line}</p>}
                    <p className="text-sm text-on-surface-variant m-0">{cityLine}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <p className="text-xs text-outline">
          Manage addresses in your Shopify account settings.
        </p>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile',
  robots: { index: false, follow: false },
}

export default function AccountProfilePage() {
  // TODO: fetch customer via Shopify Customer API using session token

  return (
    <div>
      <h1 className="type-headline" style={{ marginBottom: '3rem' }}>Profile</h1>

      {/* Personal info */}
      <section style={{ marginBottom: '4rem' }}>
        <p className="type-label" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
          Personal Information
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {[
            { label: 'First Name', value: '' },
            { label: 'Last Name', value: '' },
            { label: 'Email Address', value: '', col: 2 },
            { label: 'Phone Number', value: '', col: 2 },
          ].map((field) => (
            <div key={field.label} style={{ gridColumn: field.col === 2 ? 'span 2' : 'span 1' }}>
              <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
                {field.label}
              </label>
              <input className="input-line" defaultValue={field.value} />
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '2.5rem' }}>
          Save Changes
        </button>
      </section>

      {/* Address book */}
      <section>
        <p className="type-label" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e8e8e8' }}>
          Address Book
        </p>

        {/* Placeholder addresses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Bintang Anandhiya',
              line: 'Jl. Sudirman No. 12, Jakarta Selatan',
              city: 'Jakarta 12190, Indonesia',
              default: true,
            },
          ].map((addr, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f3f3f3',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                {addr.default && (
                  <span
                    className="type-label"
                    style={{
                      backgroundColor: '#000',
                      color: '#e2e2e2',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.65rem',
                      marginBottom: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    Default
                  </span>
                )}
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 0.25rem' }}>{addr.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#474747', margin: '0 0 0.2rem' }}>{addr.line}</p>
                <p style={{ fontSize: '0.875rem', color: '#474747', margin: 0 }}>{addr.city}</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button className="type-label" style={{ background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #777', color: '#474747', padding: 0 }}>
                  Edit
                </button>
                <button className="type-label" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ba1a1a', padding: 0 }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-secondary">
          Add New Address
        </button>
      </section>
    </div>
  )
}

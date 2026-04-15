'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { href: '/products', label: 'Shop' },
  { href: '/products?collection=new', label: 'New' },
  { href: '/products?collection=sale', label: 'Sale' },
]

export default function Navbar() {
  const { itemCount, toggleCart } = useCartStore()
  const count = itemCount()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(198,198,198,0.2)',
      }}
    >
      <nav
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Image src="/JON Black.png" alt="JON" width={80} height={32} priority style={{ objectFit: 'contain' }} />
        </Link>

        {/* Nav links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-label"
                style={{ color: '#1b1b1b', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            href="/account"
            className="type-label"
            style={{ color: '#1b1b1b', textDecoration: 'none' }}
          >
            Account
          </Link>

          <button
            onClick={toggleCart}
            className="type-label"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1b1b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Cart
            {count > 0 && (
              <span
                style={{
                  background: '#000',
                  color: '#e2e2e2',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/store/cart'

type MenuItem = {
  label: string
  href: string
  featured?: { label: string; href: string; image: string; sub: string }[]
  links?: { label: string; href: string }[][]
}

const NAV_ITEMS: MenuItem[] = [
  {
    label: 'Shop',
    href: '/products',
    featured: [
      { label: 'Tops',        sub: 'T-shirts, jerseys & more',  href: '/products?collection=tops',        image: '/mocks/apparel-1.png' },
      { label: 'Bottoms',     sub: 'Shorts, tights & pants',    href: '/products?collection=bottoms',     image: '/mocks/apparel-2.png' },
      { label: 'Outerwear',   sub: 'Jackets & hoodies',         href: '/products?collection=outerwear',   image: '/mocks/apparel-3.png' },
      { label: 'Accessories', sub: 'Bags, caps & gear',         href: '/products?collection=accessories', image: '/mocks/apparel-4.png' },
    ],
  },
  {
    label: 'New',
    href: '/products?collection=new',
    links: [
      [
        { label: 'New Arrivals',   href: '/products?collection=new' },
        { label: 'SS25 Collection',href: '/products?collection=ss25' },
        { label: 'Just Dropped',   href: '/products?collection=dropped' },
        { label: 'Restocks',       href: '/products?collection=restocks' },
      ],
      [
        { label: 'Tops',        href: '/products?collection=new&type=tops' },
        { label: 'Bottoms',     href: '/products?collection=new&type=bottoms' },
        { label: 'Outerwear',   href: '/products?collection=new&type=outerwear' },
        { label: 'Accessories', href: '/products?collection=new&type=accessories' },
      ],
    ],
  },
  {
    label: 'Sale',
    href: '/products?collection=sale',
    links: [
      [
        { label: 'All Sale',      href: '/products?collection=sale' },
        { label: 'Up to 30% Off', href: '/products?collection=sale&discount=30' },
        { label: 'Up to 50% Off', href: '/products?collection=sale&discount=50' },
        { label: 'Final Sale',    href: '/products?collection=final-sale' },
      ],
      [
        { label: 'Tops',        href: '/products?collection=sale&type=tops' },
        { label: 'Bottoms',     href: '/products?collection=sale&type=bottoms' },
        { label: 'Outerwear',   href: '/products?collection=sale&type=outerwear' },
        { label: 'Accessories', href: '/products?collection=sale&type=accessories' },
      ],
    ],
  },
]

export default function Navbar() {
  const { data: session } = useSession()
  const count = useCartStore(
    (s) => s.cart?.lines.nodes.reduce((sum, l) => sum + l.quantity, 0) ?? 0,
  )

  // Desktop mega menu
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMenu  = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveMenu(label) }
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120) }
  const cancelClose   = () => { if (closeTimer.current) clearTimeout(closeTimer.current) }

  // Mobile drawer
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const closeAll = () => { setActiveMenu(null); setMobileOpen(false) }

  const activeItem = NAV_ITEMS.find((i) => i.label === activeMenu)

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/90 backdrop-blur-2xl ${activeMenu ? '' : 'border-b border-[rgba(198,198,198,0.2)]'}`}
      >
        <nav className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="no-underline flex items-center" onClick={closeAll}>
            <Image src="/JON Black.png" alt="JON" width={80} height={32} priority className="object-contain" />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex list-none m-0 p-0 h-16">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
                className="relative flex items-center px-5"
              >
                <Link
                  href={item.href}
                  className={`type-label text-on-surface no-underline border-b-2 transition-colors duration-150 ${activeMenu === item.label ? 'border-black' : 'border-transparent'}`}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={session ? '/account' : '/auth/login'}
              className="type-label text-on-surface no-underline"
            >
              {session ? 'Account' : 'Login'}
            </Link>
            <Link
              href="/cart"
              className="type-label text-on-surface no-underline flex items-center gap-[0.4rem]"
            >
              Cart
              {count > 0 && (
                <span className="bg-primary text-on-primary w-[18px] h-[18px] text-[0.65rem] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile row */}
          <div className="flex md:hidden items-center gap-5">
            {/* Cart */}
            <Link
              href="/cart"
              className="type-label text-on-surface no-underline flex items-center gap-[0.4rem]"
            >
              Cart
              {count > 0 && (
                <span className="bg-primary text-on-primary w-[18px] h-[18px] text-[0.65rem] flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="bg-transparent border-none cursor-pointer p-1 flex flex-col gap-[5px]"
            >
              <span className="block w-[22px] h-[2px] bg-primary" />
              <span className="block w-[22px] h-[2px] bg-primary" />
              <span className="block w-[14px] h-[2px] bg-primary" />
            </button>
          </div>
        </nav>

        {/* Desktop mega menu panel */}
        {activeItem && (
          <div
            className="jon-megamenu absolute top-16 left-0 right-0 border-b border-[rgba(198,198,198,0.25)] shadow-[0_24px_48px_rgba(0,0,0,0.07)] bg-white/95 backdrop-blur-2xl"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-[1440px] mx-auto px-8 pt-10 pb-12">

              {/* Shop — image tiles */}
              {activeItem.featured && (
                <div className="grid grid-cols-4 gap-4">
                  {activeItem.featured.map((cat) => (
                    <Link key={cat.label} href={cat.href} onClick={closeAll} className="no-underline">
                      <div
                        className="group relative aspect-[3/4] overflow-hidden bg-surface-high"
                      >
                        <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="type-headline text-white text-[1.1rem] m-0 mb-[0.2rem]">{cat.label}</p>
                          <p className="type-label text-white/65 m-0">{cat.sub}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* New / Sale — link columns + featured image */}
              {activeItem.links && (
                <div className="grid grid-cols-3 gap-16 items-start">
                  {activeItem.links.map((col, ci) => (
                    <div key={ci}>
                      <p className="type-label text-outline mb-5">
                        {ci === 0 ? activeItem.label : 'By Category'}
                      </p>
                      <ul className="list-none m-0 p-0 flex flex-col gap-[0.875rem]">
                        {col.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={closeAll}
                              className="text-[0.9375rem] text-on-surface no-underline font-medium transition-opacity hover:opacity-60"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/* Featured image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-high">
                    <Image
                      src={activeItem.label === 'Sale' ? '/mocks/apparel-3.png' : '/mocks/apparel-1.png'}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="type-label text-white/70 m-0 mb-[0.4rem]">
                        {activeItem.label === 'Sale' ? 'Up to 50% off' : 'SS25'}
                      </p>
                      <p className="type-headline text-white text-[1.1rem] m-0">
                        {activeItem.label === 'Sale' ? 'Shop the Sale' : 'New This Season'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} />}

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-surface-high">
          <Link href="/" onClick={closeAll} className="no-underline flex items-center">
            <Image src="/JON Black.png" alt="JON" width={72} height={28} className="object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="bg-transparent border-none cursor-pointer text-2xl text-on-surface leading-none px-2 py-1"
          >
            ×
          </button>
        </div>

        {/* Drawer nav */}
        <div className="px-6 pb-12">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                className="mobile-accordion-trigger"
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
              >
                {item.label}
                <span className={`inline-block text-base font-light transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {mobileExpanded === item.label && (
                <div className="mobile-accordion-content">
                  {/* Shop — list of category links */}
                  {item.featured && item.featured.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={closeAll}
                      className="text-[0.9375rem] text-on-surface no-underline font-medium"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  {/* New / Sale — flat merged list */}
                  {item.links && item.links.flat().map((link) => (
                    <Link
                      key={link.label + link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="text-[0.9375rem] text-on-surface no-underline font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Account link */}
          <div className="border-b border-surface-high py-5">
            <Link
              href={session ? '/account' : '/auth/login'}
              onClick={closeAll}
              className="type-label text-on-surface no-underline"
            >
              {session ? 'Account' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function EmailSubscribeModal() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div
      className="jon-overlay fixed inset-0 z-[200] bg-black/[0.72] flex items-center justify-center p-6"
      onClick={() => setVisible(false)}
    >
      <div
        className="jon-modal grid grid-cols-2 w-full max-w-[820px] max-h-[90vh] overflow-hidden max-sm:grid-cols-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — editorial image panel */}
        <div className="relative min-h-[520px] bg-black overflow-hidden max-sm:hidden">
          <Image
            src="/mocks/apparel-2.png"
            alt=""
            fill
            className="object-cover opacity-[0.55]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <p className="type-label text-outline mb-5">
              SS25 — Just One Nation
            </p>
            <h2
              className="type-display text-white m-0 leading-none"
              style={{ fontSize: 'clamp(2.25rem, 3.5vw, 3rem)' }}
            >
              Join<br />the<br />Nation.
            </h2>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="bg-surface px-12 py-14 flex flex-col justify-center relative">
          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close"
            className="absolute top-5 right-5 bg-transparent border-none cursor-pointer text-outline text-2xl leading-none px-2 py-1 transition-colors duration-150"
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#000')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#777')}
          >
            ×
          </button>

          {submitted ? (
            /* Success state */
            <div>
              <p className="type-label text-outline mb-6">
                You&apos;re in.
              </p>
              <h3 className="type-headline mb-4 text-[1.75rem]">
                Welcome to JON.
              </h3>
              <p className="text-sm text-on-surface-variant leading-[1.8] m-0">
                Expect early access, exclusive drops, and stories from the field — straight to your inbox.
              </p>
              <button
                onClick={() => setVisible(false)}
                className="btn-primary mt-10 w-full"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Subscribe form */
            <>
              <p className="type-label text-outline mb-8">
                Mailing List
              </p>
              <h3 className="type-headline mb-4 text-[1.5rem] leading-tight">
                Early access.<br />Exclusive drops.
              </h3>
              <p className="text-sm text-on-surface-variant leading-[1.8] mb-10">
                Be first to know about new collections, limited releases, and insider stories from JON.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="flex flex-col gap-7"
              >
                <input
                  className="input-line text-base"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary w-full">
                  Subscribe
                </button>
              </form>

              <button
                onClick={() => setVisible(false)}
                className="bg-transparent border-none cursor-pointer mt-5 text-[0.7rem] tracking-[0.1em] uppercase text-[#aaa] p-0 transition-colors duration-150"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#474747')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#aaa')}
              >
                No thanks
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

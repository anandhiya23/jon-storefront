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
      className="jon-overlay"
      onClick={() => setVisible(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        className="jon-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflow: 'hidden',
        }}
      >
        {/* Left — editorial image panel */}
        <div
          style={{
            position: 'relative',
            minHeight: '520px',
            backgroundColor: '#000',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/mocks/apparel-2.png"
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.55 }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <p className="type-label" style={{ color: '#777', marginBottom: '1.25rem' }}>
              SS25 — Just One Nation
            </p>
            <h2
              className="type-display"
              style={{
                color: '#fff',
                fontSize: 'clamp(2.25rem, 3.5vw, 3rem)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              Join<br />the<br />Nation.
            </h2>
          </div>
        </div>

        {/* Right — form panel */}
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '3.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#777',
              fontSize: '1.5rem',
              lineHeight: 1,
              padding: '0.25rem 0.5rem',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#000')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#777')}
          >
            ×
          </button>

          {submitted ? (
            /* Success state */
            <div>
              <p className="type-label" style={{ color: '#777', marginBottom: '1.5rem' }}>
                You&apos;re in.
              </p>
              <h3
                className="type-headline"
                style={{ marginBottom: '1rem', fontSize: '1.75rem' }}
              >
                Welcome to JON.
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#474747', lineHeight: 1.8, margin: 0 }}>
                Expect early access, exclusive drops, and stories from the field — straight to your inbox.
              </p>
              <button
                onClick={() => setVisible(false)}
                className="btn-primary"
                style={{ marginTop: '2.5rem', width: '100%' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Subscribe form */
            <>
              <p className="type-label" style={{ color: '#777', marginBottom: '2rem' }}>
                Mailing List
              </p>
              <h3
                className="type-headline"
                style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.2 }}
              >
                Early access.<br />Exclusive drops.
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#474747',
                  lineHeight: 1.8,
                  marginBottom: '2.5rem',
                }}
              >
                Be first to know about new collections, limited releases, and insider stories from JON.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
              >
                <input
                  className="input-line"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ fontSize: '1rem' }}
                />
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Subscribe
                </button>
              </form>

              <button
                onClick={() => setVisible(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '1.25rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  padding: 0,
                  transition: 'color 0.15s ease',
                }}
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

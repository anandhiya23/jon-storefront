import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 64px)' }}>
      {/* Left — editorial image */}
      <div
        style={{
          backgroundColor: '#1b1b1b',
          backgroundImage: 'linear-gradient(160deg, #000 0%, #3b3b3b 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '4rem',
        }}
      >
        <h2
          className="type-display"
          style={{ color: '#fff', fontSize: 'clamp(2.5rem, 4vw, 4rem)', margin: 0, maxWidth: '480px' }}
        >
          Move with intent.<br />Perform with precision.
        </h2>
      </div>

      {/* Right — form */}
      <div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem',
          maxWidth: '520px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '0.15em',
            marginBottom: '3rem',
          }}
        >
          JON
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <button
            className="type-label"
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '2px solid #000',
              paddingBottom: '0.5rem',
              cursor: 'pointer',
              color: '#000',
            }}
          >
            Log In
          </button>
          <Link
            href="/auth/signup"
            className="type-label"
            style={{ color: '#777', textDecoration: 'none', paddingBottom: '0.5rem' }}
          >
            Sign Up
          </Link>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <input className="input-line" type="email" placeholder="your@email.com" required />
          </div>

          <div>
            <label className="type-label" style={{ display: 'block', color: '#474747', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input className="input-line" type="password" placeholder="••••••••" required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href="/auth/forgot-password"
              className="type-label"
              style={{ color: '#474747', textDecoration: 'none', borderBottom: '1px solid #474747' }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '2.5rem 0',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e8e8e8' }} />
          <span className="type-label" style={{ color: '#777' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e8e8e8' }} />
        </div>

        <button
          className="btn-secondary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
        >
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: '#474747' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: '#000', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #000' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

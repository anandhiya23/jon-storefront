'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="type-label text-outline mb-4">Error</p>
      <h1 className="type-headline mb-6">Something went wrong</h1>
      <p className="text-sm text-on-surface-variant mb-10 max-w-[400px]">
        We hit an unexpected error. Try again or contact support if the issue persists.
      </p>
      <button onClick={unstable_retry} className="btn-primary min-w-[180px]">
        Try Again
      </button>
    </main>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="type-label text-outline mb-4">404</p>
      <h1 className="type-headline mb-6">Page not found</h1>
      <p className="text-sm text-on-surface-variant mb-10 max-w-[400px]">
        That page doesn&apos;t exist. It may have moved or the link is incorrect.
      </p>
      <Link href="/" className="btn-primary min-w-[180px]">
        Back to Home
      </Link>
    </main>
  )
}

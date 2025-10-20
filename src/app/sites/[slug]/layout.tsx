import { Metadata } from 'next'

export const metadata: Metadata = {
  charset: 'utf-8',
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

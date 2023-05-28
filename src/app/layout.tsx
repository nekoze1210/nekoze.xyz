export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja-JP'>
      <body>{children}</body>
    </html>
  )
}

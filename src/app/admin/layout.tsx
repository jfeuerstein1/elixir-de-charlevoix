export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f9f8f6' }}>
        {children}
      </body>
    </html>
  );
}

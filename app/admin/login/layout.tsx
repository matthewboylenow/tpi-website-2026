// Login page has its own layout without auth check
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-900)]">
      {children}
    </div>
  );
}

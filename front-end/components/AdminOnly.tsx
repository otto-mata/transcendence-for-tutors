"use client";

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  // naive admin check: read localStorage flag set by dev
  const isAdmin = typeof window !== 'undefined' && window.localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) return null;
  return <>{children}</>;
}

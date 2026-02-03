import ResponsiveNav from "@/components/ResponsiveNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <ResponsiveNav />
      {children}
    </div>
  );
}

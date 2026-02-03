import ResponsiveNav from "@/components/ResponsiveNav";
import { UserProvider } from "@/client/UserContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div className="flex w-full">
        <ResponsiveNav />
        {children}
      </div>
    </UserProvider>
  );
}

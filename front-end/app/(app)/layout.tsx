import ResponsiveNav from "@/components/ResponsiveNav";
import ChatPopup from "@/components/Chat/ChatPopup";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <ResponsiveNav />
      {children}
      <ChatPopup />
    </div>
  );
}

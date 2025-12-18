import DesktopSidebar from "./DesktopSidebar";

export const WithSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-center xl:grid xl:grid-cols-[auto_1fr]">
      <div className="hidden xl:block">
        <DesktopSidebar />
      </div>
      <div className="w-full max-w-3xl mx-auto xl:max-w-6xl">{children}</div>
    </div>
  );
};

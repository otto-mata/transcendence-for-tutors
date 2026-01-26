export const WithSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Sidebar is provided globally by ResponsiveNav in layout; this wrapper only centers content.
  return (
    <div className="w-full max-w-3xl mx-auto xl:max-w-6xl">{children}</div>
  );
};

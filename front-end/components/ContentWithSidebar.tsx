export const WithSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.2fr_0.8fr] xl:grid-cols-[0.1fr_0.9fr]">
      <div className="hidden md:block bg-amber-400">sidebar</div>
      <div className="xl:w-2xl xl:mx-auto">{children}</div>
    </div>
  );
};

export const WithSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-center xl:grid xl:grid-cols-[0.1fr_0.9fr]">
      <div className="hidden xl:block bg-amber-400">sidebar</div>
      <div className="md:w-3xl xl:mx-auto xl:w-6xl">{children}</div>
    </div>
  );
};

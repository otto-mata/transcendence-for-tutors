import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ft_transcendence",
  description: "whoop whoop 42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased text-sm xl:text-base`}
      >
        {children}
      </body>
    </html>
  );
}

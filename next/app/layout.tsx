import type { Metadata } from "next";
import { montserrat } from "./fonts";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kaluste Assari",
  description:
    "Kaluste Assari application. We help you find the right care guide for your furniture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}

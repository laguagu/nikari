import type { Metadata } from "next";
import { open_sans } from "./fonts";
import "./globals.css";
export const metadata: Metadata = {
  title: "Care Instructor",
  description:
    "Care Instructor application. We help you find the right care guide for your furniture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}

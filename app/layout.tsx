import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextAuth-v5",
  description: "Authentication in auth.js v5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              backgroundColor: "rgba(9,15,23)",
              background:
                "linear-gradient(90deg, rgba(9,15,23,1) 0%, rgba(35,35,55,1) 96%)",
              border: "none",
              color: "#9ec3ff",
            },
          }}
          className={`${inter.className}`}
        />
        {children}
      </body>
    </html>
  );
}

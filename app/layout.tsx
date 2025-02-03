import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nimble - AI-powered App Builder",
  description:
    "Nimble is an AI-powered app builder that generates live, fully functional applications from text prompts, enabling rapid development and real-time previews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} antialiased bg-black`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Toaster
            position="bottom-right"
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
        </Providers>
      </body>
    </html>
  );
}

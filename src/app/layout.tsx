import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ Load Google Maps API
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ✅ Toast Notifications
// import { Provider } from "react-redux";
// import { store } from "@/Store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community Events Platform",
  description: "Discover, share, and celebrate local events in your community.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Provider store={store}> */}
          <Toaster />
          {children}
        {/* </Provider> */}
      </body>
    </html>
  );
}

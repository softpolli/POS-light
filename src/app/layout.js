import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "POS-LTE",
  description: "A modern Point of Sale and Order Management System powered by SoftPolli.",
  creator: "Taukir Ahmed",
  publisher: "SoftPolli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        <Topbar></Topbar>
        {children}
      </body>
    </html>
  );
}

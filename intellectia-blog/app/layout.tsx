import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/custom-practice.css";
import Nav from "@/components/nav";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss =false;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intellectia",
  description: "Intellectia-Law firm",
   icons: {
    icon: "/images/intellectia.png", 
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}


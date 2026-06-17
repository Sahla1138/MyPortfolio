import './globals.css';
import type { Metadata } from 'next';
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'Portfolio - Sahla Sahanas',
  description: 'Portfolio website for Sahla Sahanas.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
     
        <main className='pt-16' >{children}</main>
        <footer className="container-base py-10 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Raisuite Starter. All rights reserved.
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
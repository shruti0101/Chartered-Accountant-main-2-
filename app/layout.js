

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from "@/components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// ✅ Add this metadata object
export const metadata = {
  title: 'Chintan Agrawal & CO.',
  description: '',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

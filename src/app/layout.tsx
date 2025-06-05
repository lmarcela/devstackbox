import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Container } from '@mui/material';
import NavegationComponent from '@/components/NavegationComponent';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevStackBox',
  description:
    'A modern web application built to showcase best practices with today’s top frontend technologies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Container maxWidth="lg">
            <NavegationComponent />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

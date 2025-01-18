import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
});

export const metadata = {
  title: '¿Quién me gobierna?',
  description: 'Explorando la transparencia en la gestión pública',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <body>
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

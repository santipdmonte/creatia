import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creatia - Tus Redes Sociales en Piloto Automático | Para Emprendedores Ocupados",
  description: "Planificamos, creamos y publicamos el contenido de tus redes sociales de forma automatizada. Enfócate en tu negocio, nosotros nos encargamos de tu presencia digital.",
  keywords: "emprendedores, automatización redes sociales, contenido automatizado, IA marketing, community manager automático, estrategia digital, branding automático",
  authors: [{ name: "Creatia Team" }],
  creator: "Creatia",
  openGraph: {
    title: "Creatia - Tus Redes Sociales en Piloto Automático",
    description: "Para emprendedores que no tienen tiempo para redes sociales. Automatización total con control humano.",
    url: "https://creatia.com",
    siteName: "Creatia",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatia - Redes Sociales en Piloto Automático",
    description: "Recuperá tu tiempo. Automatizá tu presencia digital. Para emprendedores ocupados.",
    creator: "@creatiaAI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme || systemTheme;
                
                if (resolvedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

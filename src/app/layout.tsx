import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ZERO 2 ONE | وكالة تسويق رقمي وتحول رقمي في السعودية",
  description:
    "ZERO 2 ONE - وكالة سعودية متخصصة في التسويق الرقمي، تطوير المواقع، تحسين محركات البحث، إدارة الحملات الإعلانية، وبناء الهوية التجارية. من الصفر إلى الواحد.",
  keywords: [
    "تسويق رقمي",
    "SEO",
    "تصميم مواقع",
    "حملات إعلانية",
    "إدارة سوشيال ميديا",
    "هوية تجارية",
    "ZERO 2 ONE",
    "السعودية",
    "تطوير متاجر",
  ],
  authors: [{ name: "ZERO 2 ONE" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "ZERO 2 ONE | وكالة تسويق رقمي رائدة",
    description: "من البدايات، إلى أعظم النهايات.. نشاركك الرحلة بكل شغف، احترافية، وإبداع",
    type: "website",
    locale: "ar_SA",
    siteName: "ZERO 2 ONE",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERO 2 ONE | وكالة تسويق رقمي رائدة",
    description: "من البدايات، إلى أعظم النهايات.. نشاركك الرحلة بكل شغف، احترافية، وإبداع",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent RTL/LTR flash on language switch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('lang');
                  if (stored === 'en') {
                    document.documentElement.lang = 'en';
                    document.documentElement.dir = 'ltr';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TVKP5KSX');`,
          }}
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZERO 2 ONE",
              description: "وكالة تسويق رقمي وبرمجة وهوية تجارية في السعودية",
              url: "https://zero2one.sa",
              email: "zero2one012025@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
              },
              areaServed: {
                "@type": "Country",
                name: "المملكة العربية السعودية",
              },
              sameAs: [
                "https://www.instagram.com/zero2onedm/",
              ],
              serviceType: [
                "التسويق الرقمي",
                "تصميم وتطوير المواقع",
                "تحسين محركات البحث",
                "إدارة الحملات الإعلانية",
                "بناء الهوية التجارية",
                "إدارة السوشيال ميديا",
                "تطوير المتاجر الإلكترونية",
              ],
            }),
          }}
        />
      </head>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVKP5KSX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

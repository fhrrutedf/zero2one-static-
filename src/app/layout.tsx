import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "ZERO TO ONE | وكالة تسويق رقمي وتحول رقمي في السعودية",
    template: "%s | ZERO TO ONE",
  },
  description:
    "ZERO TO ONE - وكالة سعودية متخصصة في التسويق الرقمي، تطوير المواقع، تحسين محركات البحث SEO، إدارة الحملات الإعلانية، بناء الهوية التجارية، وإدارة السوشيال ميديا. نأخذ مشروعك من الصفر إلى الواحد.",
  keywords: [
    "تسويق رقمي",
    "SEO",
    "تحسين محركات البحث",
    "تصميم مواقع",
    "تطوير مواقع",
    "حملات إعلانية",
    "إدارة سوشيال ميديا",
    "هوية تجارية",
    "ZERO TO ONE",
    "السعودية",
    "تطوير متاجر",
    "تسويق الكتروني",
    "وكالة تسويق",
    "digital marketing",
    "web development",
    "branding agency",
    "Riyadh",
    "Saudi Arabia",
  ],
  authors: [{ name: "ZERO TO ONE" }],
  creator: "ZERO TO ONE",
  publisher: "ZERO TO ONE",
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
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32" },
    ],
    apple: "/logo.png",
  },
  metadataBase: new URL("https://zero2one.sa"),
  alternates: {
    canonical: "https://zero2one.sa",
    languages: {
      "ar-SA": "https://zero2one.sa",
      "en-US": "https://zero2one.sa/?lang=en",
    },
  },
  openGraph: {
    title: "ZERO TO ONE | وكالة تسويق رقمي رائدة في السعودية",
    description: "من البدايات، إلى أعظم النهايات.. وكالة سعودية متخصصة في التسويق الرقمي، تطوير المواقع، SEO، الحملات الإعلانية، والهوية التجارية. من الصفر إلى الواحد.",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    url: "https://zero2one.sa",
    siteName: "ZERO TO ONE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZERO TO ONE - وكالة تسويق رقمي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZERO TO ONE | وكالة تسويق رقمي رائدة في السعودية",
    description: "من البدايات، إلى أعظم النهايات.. وكالة سعودية متخصصة في التسويق الرقمي والهوية التجارية. من الصفر إلى الواحد.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "pending-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent RTL/LTR flash and theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedLang = localStorage.getItem('lang');
                  if (storedLang === 'en') {
                    document.documentElement.lang = 'en';
                    document.documentElement.dir = 'ltr';
                  }
                  var storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZERO TO ONE",
              description: "وكالة تسويق رقمي وبرمجة وهوية تجارية في السعودية - من الصفر إلى الواحد",
              url: "https://zero2one.sa",
              logo: "https://zero2one.sa/logo.png",
              email: "info@zero2one.sa",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
                addressLocality: "الرياض",
                addressRegion: "العليا",
                streetAddress: "مجمع الكمبيوترات، الدور السابع",
              },
              areaServed: {
                "@type": "Country",
                name: "المملكة العربية السعودية",
              },
              sameAs: [
                "https://www.instagram.com/zero2onedm/",
                "https://x.com/Zero2OneDM",
                "https://www.tiktok.com/@zero2one2030",
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
              foundingDate: "2025",
              priceRange: "$$",
            }),
          }}
        />
        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://zero2one.sa/#business",
              name: "ZERO TO ONE",
              description: "وكالة تسويق رقمي وتحول رقمي في الرياض، السعودية",
              url: "https://zero2one.sa",
              telephone: "+966530307054",
              email: "info@zero2one.sa",
              image: "https://zero2one.sa/logo.png",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "الرياض",
                addressRegion: "العليا",
                addressCountry: "SA",
                streetAddress: "مجمع الكمبيوترات، الدور السابع",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 24.6877,
                longitude: 46.6729,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                "https://www.instagram.com/zero2onedm/",
                "https://x.com/Zero2OneDM",
                "https://www.tiktok.com/@zero2one2030",
              ],
            }),
          }}
        />
        {/* Schema.org WebSite for Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ZERO TO ONE",
              alternateName: ["من الصفر إلى الواحد", "ZERO 2 ONE", "صفر إلى واحد"],
              url: "https://zero2one.sa",
              inLanguage: ["ar-SA", "en-US"],
              potentialAction: {
                "@type": "SearchAction",
                "target": "https://zero2one.sa/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
        {/* Meta Pixel (noscript fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

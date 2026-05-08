import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "من الصفر إلى الواحد | Zero 2 One - وكالة تسويق رقمي",
  description:
    "وكالة تسويق رقمي رائدة في السعودية. نقدم خدمات تحسين محركات البحث، تصميم المواقع، إدارة الحملات الإعلانية، بناء الهوية التجارية، وتسويق المحتوى.",
  keywords: [
    "تسويق رقمي",
    "SEO",
    "تصميم مواقع",
    "حملات إعلانية",
    "هوية تجارية",
    "تسويق محتوى",
    "السعودية",
    "الرياض",
    "من الصفر إلى الواحد",
    "Zero 2 One",
  ],
  authors: [{ name: "من الصفر إلى الواحد" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "من الصفر إلى الواحد | Zero 2 One",
    description: "وكالة تسويق رقمي رائدة في السعودية",
    type: "website",
    locale: "ar_SA",
    siteName: "من الصفر إلى الواحد",
  },
  twitter: {
    card: "summary_large_image",
    title: "من الصفر إلى الواحد | Zero 2 One",
    description: "وكالة تسويق رقمي رائدة في السعودية",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "من الصفر إلى الواحد",
              alternateName: "Zero 2 One",
              description:
                "وكالة تسويق رقمي رائدة في السعودية",
              url: "https://zero2one.sa",
              telephone: "+966530307054",
              email: "Info@zero2one.sa",
              address: {
                "@type": "PostalAddress",
                addressLocality: "الرياض",
                addressCountry: "SA",
                streetAddress: "الرياض",
              },
              areaServed: {
                "@type": "Country",
                name: "المملكة العربية السعودية",
              },
              serviceType: [
                "تحسين محركات البحث",
                "تصميم وتطوير المواقع",
                "إدارة الحملات الإعلانية",
                "بناء الهوية التجارية",
                "تسويق المحتوى",
              ],
              sameAs: [
                "https://twitter.com/zero2one_sa",
                "https://instagram.com/zero2one_sa",
                "https://linkedin.com/company/zero2one_sa",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "من الصفر إلى الواحد",
              url: "https://zero2one.sa",
              inLanguage: "ar",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zero2one.sa/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "من الصفر إلى الواحد - وكالة تسويق رقمي",
              image: "https://zero2one.sa/logo.svg",
              telephone: "+966530307054",
              email: "Info@zero2one.sa",
              address: {
                "@type": "PostalAddress",
                addressLocality: "الرياض",
                addressRegion: "الرياض",
                addressCountry: "SA",
              },
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            }),
          }}
        />
      </head>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        {children}
      </body>
    </html>
  );
}

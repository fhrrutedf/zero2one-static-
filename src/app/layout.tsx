import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "شركتك | وكالة تسويق رقمي رائدة",
  description:
    "وكالة تسويق رقمي رائدة في المملكة العربية السعودية. نقدم خدمات إدارة وسائل التواصل، التسويق الرقمي، التصوير والإنتاج المرئي، تحسين محركات البحث، تصميم المواقع، وإدارة الحملات الإعلانية.",
  keywords: [
    "تسويق رقمي",
    "SEO",
    "تصميم مواقع",
    "حملات إعلانية",
    "إدارة تواصل اجتماعي",
    "تصوير احترافي",
    "السعودية",
    "الرياض",
  ],
  authors: [{ name: "شركتك" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "شركتك | وكالة تسويق رقمي رائدة",
    description: "نحوّل رؤيتك إلى واقع رقمي مبهر",
    type: "website",
    locale: "ar_SA",
    siteName: "شركتك",
  },
  twitter: {
    card: "summary_large_image",
    title: "شركتك | وكالة تسويق رقمي رائدة",
    description: "نحوّل رؤيتك إلى واقع رقمي مبهر",
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
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* Meta Pixel - Replace with your Pixel ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "شركتك",
              description: "وكالة تسويق رقمي رائدة في المملكة العربية السعودية",
              url: "https://shirkatak.com",
              telephone: "+966500000000",
              email: "info@shirkatak.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "الرياض",
                addressCountry: "SA",
              },
              areaServed: {
                "@type": "Country",
                name: "المملكة العربية السعودية",
              },
              serviceType: [
                "إدارة وسائل التواصل الاجتماعي",
                "التسويق الرقمي",
                "التصوير والإنتاج المرئي",
                "تحسين محركات البحث",
                "تصميم وتطوير المواقع",
                "إدارة الحملات الإعلانية",
              ],
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

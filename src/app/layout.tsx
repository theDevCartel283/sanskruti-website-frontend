import { Metadata } from "next";
import "./globals.css";
import ProviderComponent from "@/components/providerComponent";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import NotificationComponent from "@/components/notification/notificationComponent";
import { cn } from "@/utils/lib";

import { Quicksand } from "next/font/google";
import AuthComponent from "@/components/authComponent";
import LoadingComponent from "@/components/loadingComponent";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--quicksand-font",
});

export const metadata: Metadata = {
  title: "Sanskruti NX",
  applicationName: "Sanskruti NX",
  description:
    "Sanskruti NX, a one stop destination for latest fashion, trends and clothing",
  viewport: "width=device-width, initial-scale=1",

  // Favicons
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", type: "image/png" }],
    other: [
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProviderComponent>
        <AuthComponent>
          <body
            className={cn(
              quicksand.variable,
              "relative flex min-h-screen select-none flex-col bg-white font-quicksand text-xs font-medium text-black md:text-[14px]"
            )}
          >
            <LoadingComponent />
            <Header />
            <NotificationComponent />
            {children}
            <Footer />
          </body>
        </AuthComponent>
      </ProviderComponent>
    </html>
  );
}

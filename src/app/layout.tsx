import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { DefaultLayout } from "@/components/layout";

const poppinsRegular = localFont({
  src: "./fonts/PoppinsRegular.woff",
  variable: "--font-poppins-sans",
});

export const metadata: Metadata = {
  title: "CryptoFollow",
  description: "Follow your investments in crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppinsRegular.variable}`}>
         <Provider>
          <DefaultLayout>{children}</DefaultLayout>
         </Provider>
      </body>
    </html>
  );
}

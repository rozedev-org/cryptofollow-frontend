import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { DefaultLayout } from "@/components/layout";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
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
      <body className={poppins.className}>
        <Provider>
          <Toaster richColors closeButton />
          <DefaultLayout>{children}</DefaultLayout>
        </Provider>
      </body>
    </html>
  );
}

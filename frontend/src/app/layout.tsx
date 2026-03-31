import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ToastWrapper } from "@/components/toast-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoaib Arshad - Full Stack Developer | AI-Powered Applications",
  description: "Portfolio of Shoaib Arshad, a Full Stack Developer specializing in AI-powered applications. Expert in Next.js, Python, FastAPI, React, and OpenAI API integration.",
  keywords: [
    "Shoaib Arshad",
    "Full Stack Developer",
    "AI Developer",
    "Next.js",
    "Python",
    "FastAPI",
    "React",
    "OpenAI",
    "Karachi",
    "Pakistan",
    "Portfolio",
    "Web Developer",
    "AI-Powered Applications",
  ],
  authors: [{ name: "Shoaib Arshad" }],
  creator: "Shoaib Arshad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shoaib.dev",
    title: "Shoaib Arshad - Full Stack Developer",
    description: "Full Stack Developer specializing in AI-powered applications.",
    siteName: "Shoaib Arshad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoaib Arshad - Full Stack Developer",
    description: "Full Stack Developer specializing in AI-powered applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastWrapper>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ToastWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

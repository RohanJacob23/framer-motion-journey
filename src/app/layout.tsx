import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/Nav";
import ThemeSwitch from "@/components/ThemeSwitch";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Animation Library",
  description: "Practice animations in nextjs",
};

/**
 * RootLayout component to provide a consistent layout structure for the application.
 *
 * @param children ReactNode representing the content to be rendered within the layout.
 * @returns JSX.Element containing the structured layout with ThemeProvider and Nav components.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav />
          {children}
          <ThemeSwitch />
        </ThemeProvider>
      </body>
    </html>
  );
}

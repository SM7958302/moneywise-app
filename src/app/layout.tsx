import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GameProvider } from "@/context/GameContext";
import { FriendsProvider } from "@/context/FriendsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyWise - Financial Literacy App",
  description: "Learn financial literacy through interactive games and lessons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GameProvider>
            <FriendsProvider>
              {children}
            </FriendsProvider>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GameProvider } from "@/context/GameContext";
import { FriendsProvider } from "@/context/FriendsContext";
import { ForumProvider } from "@/contexts/ForumContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyWise - Financial Literacy App",
  description: "Learn financial literacy through interactive games and tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GameProvider>
            <FriendsProvider>
              <ForumProvider>{children}</ForumProvider>
            </FriendsProvider>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

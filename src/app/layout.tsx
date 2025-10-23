import type { Metadata } from "next";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AppBar from "@/components/layout/AppBar";

export const metadata: Metadata = {
  title: "Pokemon Explorer",
  description: "Explore and discover Pokemon from the PokeAPI. View detailed information including types, abilities, height, weight, and descriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

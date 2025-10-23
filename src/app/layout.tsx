import type { Metadata } from "next";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AppBar from "@/components/layout/AppBar";

export const metadata: Metadata = {
  title: "Pokemon Explorer",
  description: "Explore and discover Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const font = Libre_Franklin({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Randle: Randomized and guess the word</title>
      <body
        className={`${font.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

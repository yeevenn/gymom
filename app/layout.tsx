import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gymom - 你的 AI 私人教练",
  description: "专属健身指导、热量计算、动作教学，让你练得更聪明",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
          © 2024 Gymom · 你的 AI 私人教练
        </footer>
      </body>
    </html>
  );
}

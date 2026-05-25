import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "InternTracker — 中国实习 & 岗位信息检索",
  description: "聚合计算机和金融领域的实习与校招岗位，支持按城市、岗位类型、发布时间筛选，每日更新。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface text-fg font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, MessageSquare, Calculator, BookOpen } from "lucide-react";

const links = [
  { href: "/", label: "首页", icon: null },
  { href: "/exercises", label: "动作库", icon: BookOpen },
  { href: "/chat", label: "AI 教练", icon: MessageSquare },
  { href: "/calories", label: "热量计算", icon: Calculator },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-black" />
          </div>
          <span className="gradient-text">Gymom</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-green-500 text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

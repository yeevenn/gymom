import Link from "next/link";
import { MessageSquare, BookOpen, Calculator, Zap, Target, TrendingUp } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI 私人教练",
    desc: "直接问 AI「我想减脂怎么练」，它会给你专属的训练建议和计划",
    href: "/chat",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: BookOpen,
    title: "动作图书馆",
    desc: "100+ 个健身动作，每个动作都有详细步骤、目标肌群和常见错误提醒",
    href: "/exercises",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Calculator,
    title: "热量计算器",
    desc: "输入你的身高体重，自动算出每天该吃多少热量和蛋白质",
    href: "/calories",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

const stats = [
  { icon: Zap, label: "立即可用", value: "无需注册" },
  { icon: Target, label: "覆盖肌群", value: "12 个部位" },
  { icon: TrendingUp, label: "训练动作", value: "100+" },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          AI 驱动的私人健身教练
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          练得更聪明
          <br />
          <span className="gradient-text">不是更辛苦</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          告诉 AI 你的目标，它帮你安排训练计划、教你每个动作、算好每天该吃多少
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/chat"
            className="px-8 py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all hover:scale-105 text-lg"
          >
            找 AI 教练聊聊 →
          </Link>
          <Link
            href="/exercises"
            className="px-8 py-4 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition-all text-lg border border-white/10"
          >
            浏览动作库
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-20 animate-fade-in-up delay-100">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
            <Icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up delay-200">
        {features.map(({ icon: Icon, title, desc, href, color, bg }) => (
          <Link key={href} href={href} className="group">
            <div className={`p-6 rounded-2xl border ${bg} hover:scale-105 transition-all duration-300 h-full`}>
              <div className={`w-12 h-12 rounded-xl ${bg} border flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              <div className={`mt-4 text-sm font-medium ${color} flex items-center gap-1`}>
                进入 <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA banner */}
      <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-green-500/20 to-green-900/10 border border-green-500/20 text-center animate-fade-in-up delay-300">
        <h2 className="text-3xl font-black mb-3">现在就开始，免费的</h2>
        <p className="text-gray-400 mb-6">不需要注册，打开就能用</p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5" />
          和 AI 教练对话
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Calculator, Flame, Beef, Droplets, Wheat } from "lucide-react";

const activityLevels = [
  { label: "几乎不动", desc: "久坐工作，很少运动", multiplier: 1.2 },
  { label: "轻度活动", desc: "每周运动 1-3 天", multiplier: 1.375 },
  { label: "中度活动", desc: "每周运动 3-5 天", multiplier: 1.55 },
  { label: "高强度活动", desc: "每周运动 6-7 天", multiplier: 1.725 },
  { label: "运动员级别", desc: "每天高强度训练或体力劳动", multiplier: 1.9 },
];

const goals = [
  { label: "减脂", desc: "每天少吃 500 大卡", adjust: -500, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { label: "维持", desc: "保持当前体重", adjust: 0, color: "text-green-400 bg-green-500/10 border-green-500/20" },
  { label: "增肌", desc: "每天多吃 300 大卡", adjust: 300, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
];

export default function CaloriesPage() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityIdx, setActivityIdx] = useState(1);
  const [goalIdx, setGoalIdx] = useState(1);
  const [result, setResult] = useState<null | {
    bmr: number;
    tdee: number;
    target: number;
    protein: number;
    carbs: number;
    fat: number;
  }>(null);

  function calculate() {
    const a = Number(age);
    const h = Number(height);
    const w = Number(weight);
    if (!a || !h || !w) return;

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * activityLevels[activityIdx].multiplier;
    const target = tdee + goals[goalIdx].adjust;
    const protein = w * 1.8;
    const fat = (target * 0.25) / 9;
    const carbs = (target - protein * 4 - fat * 9) / 4;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">热量计算器</span>
        </h1>
        <p className="text-gray-400">根据你的身体数据，计算每天应该摄取多少热量</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-7">
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">性别</label>
          <div className="flex gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                  gender === g
                    ? "bg-green-500 text-black"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {g === "male" ? "男" : "女"}
              </button>
            ))}
          </div>
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "年龄", unit: "岁", value: age, setter: setAge, placeholder: "25" },
            { label: "身高", unit: "cm", value: height, setter: setHeight, placeholder: "175" },
            { label: "体重", unit: "kg", value: weight, setter: setWeight, placeholder: "70" },
          ].map(({ label, unit, value, setter, placeholder }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {label} <span className="text-gray-500 font-normal">({unit})</span>
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Activity level */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">运动频率</label>
          <div className="space-y-2">
            {activityLevels.map((level, i) => (
              <button
                key={i}
                onClick={() => setActivityIdx(i)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  activityIdx === i
                    ? "bg-green-500/20 border-green-500/40 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">{level.label}</span>
                <span className="text-sm ml-2 opacity-70">— {level.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">我的目标</label>
          <div className="grid grid-cols-3 gap-3">
            {goals.map((goal, i) => (
              <button
                key={i}
                onClick={() => setGoalIdx(i)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  goalIdx === i ? goal.color : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                <div className="font-bold mb-1">{goal.label}</div>
                <div className="text-xs opacity-70">{goal.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all text-lg flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          计算我的热量
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-4 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white">你的每日目标</h2>

          {/* Main calorie card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-green-900/10 border border-green-500/30 text-center">
            <Flame className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <div className="text-6xl font-black text-white mb-2">{result.target}</div>
            <div className="text-green-400 font-medium">大卡 / 天</div>
            <div className="mt-4 text-sm text-gray-400">
              基础代谢：{result.bmr} 大卡 &nbsp;|&nbsp; 维持热量：{result.tdee} 大卡
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
              <Beef className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{result.protein}g</div>
              <div className="text-red-400 text-sm font-medium mt-1">蛋白质</div>
              <div className="text-gray-500 text-xs mt-1">肌肉生长必需</div>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-center">
              <Wheat className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{result.carbs}g</div>
              <div className="text-yellow-400 text-sm font-medium mt-1">碳水</div>
              <div className="text-gray-500 text-xs mt-1">训练能量来源</div>
            </div>
            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{result.fat}g</div>
              <div className="text-blue-400 text-sm font-medium mt-1">脂肪</div>
              <div className="text-gray-500 text-xs mt-1">荷尔蒙维持</div>
            </div>
          </div>

          {/* Meal examples */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-bold text-white mb-4">一天可以怎么吃（参考）</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-white font-medium">早餐</span>
                  <span className="ml-2">燕麦 + 水煮蛋 + 牛奶</span>
                </div>
                <span className="text-green-400">{Math.round(result.target * 0.25)} 大卡</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-white font-medium">午餐</span>
                  <span className="ml-2">米饭 + 鸡胸肉 + 蔬菜</span>
                </div>
                <span className="text-green-400">{Math.round(result.target * 0.35)} 大卡</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <span className="text-white font-medium">下午加餐</span>
                  <span className="ml-2">希腊酸奶 + 坚果</span>
                </div>
                <span className="text-green-400">{Math.round(result.target * 0.1)} 大卡</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <span className="text-white font-medium">晚餐</span>
                  <span className="ml-2">杂粮 + 鱼 + 绿叶蔬菜</span>
                </div>
                <span className="text-green-400">{Math.round(result.target * 0.3)} 大卡</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

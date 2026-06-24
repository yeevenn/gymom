"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Target, RotateCcw } from "lucide-react";

const muscleGroups = ["全部", "胸肌", "背部", "肩膀", "手臂", "腹肌", "腿部", "臀部"];

const exercises = [
  {
    name: "卧推",
    muscle: "胸肌",
    equipment: "哑铃 / 杠铃",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "躺在卧推凳上，背部贴紧凳面，双脚踩地",
      "握住杠铃，握距略宽于肩膀",
      "将杠铃缓慢放到胸口，感受胸肌拉伸",
      "用力推起，呼气，动作顶端夹紧胸肌",
    ],
    tips: "下放时不要让肘部锁死，保持张力",
    target: "胸大肌、三角肌前束、三头肌",
  },
  {
    name: "引体向上",
    muscle: "背部",
    equipment: "单杠",
    sets: "3-4 组",
    reps: "6-10 次",
    level: "中级",
    steps: [
      "双手握住单杠，握距与肩同宽",
      "身体自然下垂，核心收紧",
      "肘部向下发力，将胸口拉向单杠",
      "缓慢下放，不要甩动身体",
    ],
    tips: "上拉时想象肘部往下后方收，而不是用手腕拉",
    target: "背阔肌、斜方肌、二头肌",
  },
  {
    name: "深蹲",
    muscle: "腿部",
    equipment: "杠铃 / 自重",
    sets: "4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "双脚与肩同宽或略宽，脚尖微微向外",
      "胸部挺起，腰背保持中立位",
      "屈膝向下蹲，膝盖跟脚尖方向保持一致",
      "蹲到大腿平行地面，用腿部力量蹬起",
    ],
    tips: "膝盖不要内扣，下蹲时保持脚跟踩地",
    target: "股四头肌、臀大肌、腘绳肌",
  },
  {
    name: "平板支撑",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3 组",
    reps: "30-60 秒",
    level: "初级",
    steps: [
      "肘部撑地，位于肩膀正下方",
      "脚尖撑地，身体呈一条直线",
      "收紧腹部和臀部，不要塌腰或翘臀",
      "保持正常呼吸，坚持目标时间",
    ],
    tips: "如果腰部下沉就停下来，质量比时间更重要",
    target: "腹横肌、腹直肌、竖脊肌",
  },
  {
    name: "哑铃弯举",
    muscle: "手臂",
    equipment: "哑铃",
    sets: "3 组",
    reps: "10-15 次",
    level: "初级",
    steps: [
      "站立，双手各握一个哑铃，掌心朝上",
      "上臂贴紧身体两侧，不要晃动",
      "弯曲肘部将哑铃举到肩膀高度",
      "缓慢放下，感受二头肌的拉伸",
    ],
    tips: "不要用身体甩动来借力，保持上臂固定",
    target: "肱二头肌、肱肌",
  },
  {
    name: "肩推",
    muscle: "肩膀",
    equipment: "哑铃 / 杠铃",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "坐在有靠背的凳上，哑铃举到肩膀两侧",
      "掌心朝前，肘部与地面垂直",
      "用力将哑铃向上推，双臂在头顶几乎伸直",
      "缓慢下放回肩膀高度",
    ],
    tips: "推到顶端时不要完全锁肘，保持肌肉持续发力",
    target: "三角肌前束和中束、三头肌",
  },
  {
    name: "硬拉",
    muscle: "背部",
    equipment: "杠铃",
    sets: "3-4 组",
    reps: "5-8 次",
    level: "中级",
    steps: [
      "杠铃放在脚踝前，双脚与髋同宽",
      "屈髋屈膝，双手握住杠铃，握距与肩同宽",
      "挺胸、收腹，保持背部笔直",
      "用腿部和髋部力量站起，杠铃贴近腿部上升",
    ],
    tips: "整个过程保持脊椎中立，不要弓背",
    target: "背阔肌、竖脊肌、臀大肌、腘绳肌",
  },
  {
    name: "臀桥",
    muscle: "臀部",
    equipment: "无需器械",
    sets: "3 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "躺在地上，双膝弯曲，脚跟踩地靠近臀部",
      "双手平放在身体两侧",
      "夹紧臀部，将臀部抬离地面",
      "在顶部保持 1-2 秒，缓慢下放",
    ],
    tips: "顶部时候想象夹住一张纸，充分收缩臀肌",
    target: "臀大肌、腘绳肌、核心肌群",
  },
  {
    name: "卷腹",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3-4 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "躺在地上，双膝弯曲，双手轻放耳朵两侧",
      "收缩腹肌，缓慢将上背抬起",
      "在顶端感受腹肌收缩，停留 1 秒",
      "缓慢下放，不要让头部落地",
    ],
    tips: "用腹肌卷起，不是用脖子拉，颈部保持放松",
    target: "腹直肌上部、腹斜肌",
  },
  {
    name: "弓步蹲",
    muscle: "腿部",
    equipment: "无需器械",
    sets: "3 组",
    reps: "每腿 10 次",
    level: "初级",
    steps: [
      "站立，一只脚向前迈一大步",
      "弯曲前膝直到大腿平行地面",
      "后膝几乎触地，保持上身直立",
      "蹬起前脚，收回站立，换腿重复",
    ],
    tips: "前膝不要超过脚尖太多，保持身体平衡",
    target: "股四头肌、臀大肌、腘绳肌",
  },
  {
    name: "绳索下压",
    muscle: "手臂",
    equipment: "绳索机",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站在绳索机前，握住手柄，上臂贴紧身体",
      "手肘固定不动，向下用力压",
      "完全伸直手臂，收紧三头肌",
      "缓慢回放到起始位置",
    ],
    tips: "上臂不要前后晃动，只动小臂",
    target: "肱三头肌",
  },
  {
    name: "侧平举",
    muscle: "肩膀",
    equipment: "哑铃",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "双手各握哑铃，自然垂放在身体两侧",
      "肘部微弯，像端盘子一样将手臂向两侧抬起",
      "抬到与肩膀齐平，拇指略低于小指",
      "缓慢下放",
    ],
    tips: "不要用惯性甩起来，用轻一点的重量做标准动作",
    target: "三角肌中束",
  },
];

const levelColors: Record<string, string> = {
  初级: "bg-green-500/20 text-green-400",
  中级: "bg-yellow-500/20 text-yellow-400",
  高级: "bg-red-500/20 text-red-400",
};

function ExerciseCard({ exercise }: { exercise: typeof exercises[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all">
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-white font-bold text-lg">{exercise.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[exercise.level]}`}>
              {exercise.level}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              {exercise.muscle}
            </span>
            <span>·</span>
            <span>{exercise.equipment}</span>
            <span>·</span>
            <span>{exercise.sets} × {exercise.reps}</span>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/10 pt-4">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-3">动作步骤</h4>
              <ol className="space-y-2">
                {exercise.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-xs font-semibold text-yellow-400 mb-1">💡 重要提醒</div>
                <p className="text-sm text-gray-300">{exercise.tips}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-xs font-semibold text-blue-400 mb-1">
                  <RotateCcw className="w-3 h-3 inline mr-1" />
                  目标肌群
                </div>
                <p className="text-sm text-gray-300">{exercise.target}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExercisesPage() {
  const [activeGroup, setActiveGroup] = useState("全部");

  const filtered = activeGroup === "全部"
    ? exercises
    : exercises.filter((e) => e.muscle === activeGroup);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">动作库</span>
        </h1>
        <p className="text-gray-400">点击每个动作展开详细步骤和技巧说明</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {muscleGroups.map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeGroup === group
                ? "bg-green-500 text-black"
                : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div className="space-y-3">
        {filtered.map((exercise) => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          该部位暂无动作，持续更新中...
        </div>
      )}
    </div>
  );
}

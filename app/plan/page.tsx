"use client";

import { useState } from "react";
import { Calendar, Zap, ChevronDown, ChevronUp, Clock, RotateCcw } from "lucide-react";

type Goal = "减脂" | "增肌" | "塑形";
type Level = "新手" | "有经验";

const plans: Record<Goal, Record<Level, {
  name: string;
  desc: string;
  days: {
    day: string;
    label: string;
    color: string;
    muscles: string;
    duration: string;
    exercises: { name: string; sets: string; reps: string; rest: string; tip: string }[];
  }[];
}>> = {
  减脂: {
    新手: {
      name: "减脂三分化（新手版）",
      desc: "每周练 3 天，每次 45-60 分钟。以复合动作为主，热量消耗最大化，同时保留肌肉",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-orange-500/20 to-orange-900/10 border-orange-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "50 分钟",
          exercises: [
            { name: "哑铃卧推", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "重量轻一点，动作标准" },
            { name: "上斜哑铃卧推", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "感受上胸收缩" },
            { name: "坐姿哑铃肩推", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "不要耸肩" },
            { name: "侧平举", sets: "3", reps: "15 次", rest: "45 秒", tip: "用轻重量标准做" },
            { name: "绳索下压", sets: "3", reps: "15 次", rest: "45 秒", tip: "上臂固定" },
            { name: "登山者（有氧结尾）", sets: "3", reps: "30 秒", rest: "30 秒", tip: "全力冲刺" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "50 分钟",
          exercises: [
            { name: "下拉机（宽握）", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "肘部下拉，不是手拉" },
            { name: "坐姿绳索划船", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "拉到腹部，夹背" },
            { name: "哑铃单臂划船", sets: "3", reps: "12 次/侧", rest: "60 秒", tip: "用背部主导" },
            { name: "面拉", sets: "3", reps: "15 次", rest: "45 秒", tip: "改善姿态必做" },
            { name: "哑铃弯举", sets: "3", reps: "12-15 次", rest: "45 秒", tip: "不要借力" },
            { name: "俄罗斯转体（有氧结尾）", sets: "3", reps: "20 次", rest: "30 秒", tip: "带哑铃增难度" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-green-500/20 to-green-900/10 border-green-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "55 分钟",
          exercises: [
            { name: "深蹲", sets: "4", reps: "12-15 次", rest: "60 秒", tip: "腿部最大的热量消耗" },
            { name: "腿举", sets: "3", reps: "15 次", rest: "60 秒", tip: "重量适中，感受肌肉" },
            { name: "罗马尼亚硬拉", sets: "3", reps: "12 次", rest: "60 秒", tip: "感受腘绳肌拉伸" },
            { name: "弓步蹲", sets: "3", reps: "每腿 12 次", rest: "45 秒", tip: "保持上身直立" },
            { name: "臀桥", sets: "3", reps: "20 次", rest: "45 秒", tip: "顶端夹紧臀部" },
            { name: "平板支撑", sets: "3", reps: "40 秒", rest: "20 秒", tip: "腹部全程收紧" },
          ],
        },
      ],
    },
    有经验: {
      name: "减脂三分化（进阶版）",
      desc: "更高组数和超级组设计，加速燃脂。每周 3 天，每次 60-75 分钟",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-orange-500/20 to-orange-900/10 border-orange-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "65 分钟",
          exercises: [
            { name: "杠铃卧推", sets: "4", reps: "10-12 次", rest: "75 秒", tip: "力量优先" },
            { name: "上斜哑铃卧推", sets: "3", reps: "12 次", rest: "60 秒", tip: "上胸主导" },
            { name: "绳索夹胸（超级组搭配侧平举）", sets: "3", reps: "各 15 次", rest: "45 秒", tip: "两个动作连续做不休息" },
            { name: "站姿杠铃推举", sets: "4", reps: "10 次", rest: "75 秒", tip: "核心收紧" },
            { name: "颅骨碎裂者", sets: "3", reps: "12 次", rest: "60 秒", tip: "重量保守" },
            { name: "绳索下压（超级组搭配过头伸展）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "两个动作连续做" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "65 分钟",
          exercises: [
            { name: "引体向上", sets: "4", reps: "6-10 次", rest: "90 秒", tip: "做不了就辅助引体" },
            { name: "杠铃俯身划船", sets: "4", reps: "8-10 次", rest: "75 秒", tip: "腰背挺直" },
            { name: "下拉机 + 坐姿划船（超级组）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "连续做不休息" },
            { name: "面拉", sets: "3", reps: "15 次", rest: "45 秒", tip: "必做，改善圆肩" },
            { name: "杠铃弯举", sets: "3", reps: "10 次", rest: "60 秒", tip: "重量稍大" },
            { name: "上斜弯举（超级组搭配锤式）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "彻底燃烧二头" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-green-500/20 to-green-900/10 border-green-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "70 分钟",
          exercises: [
            { name: "深蹲", sets: "5", reps: "8-10 次", rest: "90 秒", tip: "主力量动作" },
            { name: "腿举", sets: "4", reps: "12 次", rest: "60 秒", tip: "深蹲辅助" },
            { name: "保加利亚分腿蹲", sets: "3", reps: "每腿 10 次", rest: "60 秒", tip: "臀腿双重刺激" },
            { name: "腿弯举", sets: "4", reps: "12 次", rest: "60 秒", tip: "腘绳肌专项" },
            { name: "杠铃臀推", sets: "4", reps: "12 次", rest: "60 秒", tip: "臀部王者动作" },
            { name: "悬挂举腿 + 俄罗斯转体（超级组）", sets: "3", reps: "各 12 次", rest: "30 秒", tip: "收尾燃脂" },
          ],
        },
      ],
    },
  },
  增肌: {
    新手: {
      name: "增肌三分化（新手版）",
      desc: "以基础复合动作为核心，重量逐步增加。每周 3 天，充分休息让肌肉生长",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-orange-500/20 to-orange-900/10 border-orange-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "60 分钟",
          exercises: [
            { name: "杠铃卧推", sets: "4", reps: "8-10 次", rest: "90 秒", tip: "每次都尝试比上次多一点重量" },
            { name: "上斜哑铃卧推", sets: "3", reps: "10-12 次", rest: "75 秒", tip: "上胸是初学者的弱项" },
            { name: "坐姿哑铃肩推", sets: "3", reps: "10-12 次", rest: "75 秒", tip: "感受肩膀发力" },
            { name: "侧平举", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "肩膀中束决定宽度" },
            { name: "绳索下压", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "三头要充分伸直" },
            { name: "过头三头伸展", sets: "3", reps: "12 次", rest: "60 秒", tip: "长头最重要" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "60 分钟",
          exercises: [
            { name: "引体向上 / 下拉机", sets: "4", reps: "6-10 次", rest: "90 秒", tip: "新手先从下拉机开始" },
            { name: "杠铃俯身划船", sets: "4", reps: "8-10 次", rest: "90 秒", tip: "背部基础力量" },
            { name: "坐姿绳索划船", sets: "3", reps: "10-12 次", rest: "75 秒", tip: "拉到腹部，充分夹背" },
            { name: "哑铃单臂划船", sets: "3", reps: "每侧 10 次", rest: "60 秒", tip: "孤立背部" },
            { name: "杠铃弯举", sets: "4", reps: "8-10 次", rest: "75 秒", tip: "二头核心力量动作" },
            { name: "哑铃弯举", sets: "3", reps: "10-12 次", rest: "60 秒", tip: "顶端扭腕增加收缩" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-green-500/20 to-green-900/10 border-green-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "65 分钟",
          exercises: [
            { name: "深蹲", sets: "4", reps: "6-8 次", rest: "120 秒", tip: "腿部增肌最重要的动作" },
            { name: "腿举", sets: "4", reps: "10-12 次", rest: "90 秒", tip: "深蹲后补充刺激" },
            { name: "腿屈伸", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "孤立股四头肌" },
            { name: "腿弯举", sets: "4", reps: "10-12 次", rest: "75 秒", tip: "后侧链很重要" },
            { name: "杠铃臀推", sets: "4", reps: "10-12 次", rest: "75 秒", tip: "臀部增肌首选" },
            { name: "小腿提踵", sets: "4", reps: "15-20 次", rest: "45 秒", tip: "顶端停留一秒" },
          ],
        },
      ],
    },
    有经验: {
      name: "增肌三分化（进阶版）",
      desc: "大重量复合动作 + 孤立动作补充，追求肌肉最大化增长。每次 70-90 分钟",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-orange-500/20 to-orange-900/10 border-orange-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "80 分钟",
          exercises: [
            { name: "杠铃卧推", sets: "5", reps: "5-8 次", rest: "120 秒", tip: "主力量日，最大化重量" },
            { name: "上斜哑铃卧推", sets: "4", reps: "8-10 次", rest: "90 秒", tip: "上胸专项" },
            { name: "下斜杠铃卧推", sets: "3", reps: "10 次", rest: "75 秒", tip: "下胸线条" },
            { name: "绳索夹胸", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "充分内侧收缩" },
            { name: "站姿杠铃推举", sets: "4", reps: "6-8 次", rest: "90 秒", tip: "肩膀力量" },
            { name: "侧平举", sets: "4", reps: "12 次", rest: "60 秒", tip: "塑造肩膀宽度" },
            { name: "颅骨碎裂者", sets: "3", reps: "10 次", rest: "75 秒", tip: "三头长头" },
            { name: "绳索下压", sets: "3", reps: "12 次", rest: "60 秒", tip: "收尾孤立" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-blue-500/20 to-blue-900/10 border-blue-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "80 分钟",
          exercises: [
            { name: "硬拉", sets: "4", reps: "4-6 次", rest: "180 秒", tip: "全身最强动作，谨慎加重" },
            { name: "引体向上", sets: "4", reps: "6-10 次", rest: "90 秒", tip: "加重量腰带增加难度" },
            { name: "杠铃俯身划船", sets: "4", reps: "6-8 次", rest: "90 秒", tip: "中背力量" },
            { name: "T 杆划船", sets: "3", reps: "10 次", rest: "75 秒", tip: "厚度训练" },
            { name: "下拉机（窄握）", sets: "3", reps: "10-12 次", rest: "60 秒", tip: "感受背阔肌拉伸" },
            { name: "面拉", sets: "3", reps: "15 次", rest: "45 秒", tip: "肩健康必做" },
            { name: "杠铃弯举", sets: "4", reps: "6-8 次", rest: "75 秒", tip: "二头力量" },
            { name: "上斜弯举", sets: "3", reps: "10 次", rest: "60 秒", tip: "长头孤立" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-green-500/20 to-green-900/10 border-green-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "85 分钟",
          exercises: [
            { name: "深蹲", sets: "5", reps: "4-6 次", rest: "180 秒", tip: "力量日，挑战大重量" },
            { name: "哈克深蹲", sets: "4", reps: "8-10 次", rest: "90 秒", tip: "股四头补充" },
            { name: "保加利亚分腿蹲", sets: "3", reps: "每腿 8 次", rest: "75 秒", tip: "臀腿联合" },
            { name: "腿弯举", sets: "4", reps: "10-12 次", rest: "75 秒", tip: "后腿链" },
            { name: "罗马尼亚硬拉", sets: "3", reps: "10 次", rest: "75 秒", tip: "腘绳拉伸" },
            { name: "杠铃臀推", sets: "4", reps: "10 次", rest: "75 秒", tip: "臀部最大重量" },
            { name: "小腿提踵", sets: "4", reps: "15-20 次", rest: "45 秒", tip: "小腿要高次数" },
            { name: "悬挂举腿", sets: "3", reps: "12 次", rest: "45 秒", tip: "腹肌收尾" },
          ],
        },
      ],
    },
  },
  塑形: {
    新手: {
      name: "塑形三分化（新手版）",
      desc: "中等重量、高次数、短休息，同时塑造肌肉线条和燃脂。适合想要好看体型的人",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "55 分钟",
          exercises: [
            { name: "上斜哑铃卧推", sets: "3", reps: "12 次", rest: "60 秒", tip: "上胸是视觉重点" },
            { name: "哑铃飞鸟", sets: "3", reps: "15 次", rest: "45 秒", tip: "拉伸和收缩都要到位" },
            { name: "俯卧撑（负重或标准）", sets: "3", reps: "12-15 次", rest: "45 秒", tip: "全程控制速度" },
            { name: "坐姿哑铃肩推", sets: "3", reps: "12 次", rest: "60 秒", tip: "打造圆润肩膀" },
            { name: "侧平举 + 前平举（超级组）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "前中束全覆盖" },
            { name: "绳索下压 + 过头伸展（超级组）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "三头塑形" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "55 分钟",
          exercises: [
            { name: "下拉机（宽握）", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "拉伸感很重要" },
            { name: "坐姿绳索划船", sets: "3", reps: "12-15 次", rest: "60 秒", tip: "背部厚度" },
            { name: "哑铃单臂划船", sets: "3", reps: "每侧 12 次", rest: "45 秒", tip: "控制动作" },
            { name: "面拉", sets: "3", reps: "15 次", rest: "45 秒", tip: "后束塑形" },
            { name: "集中弯举", sets: "3", reps: "12 次", rest: "45 秒", tip: "练出二头峰值" },
            { name: "锤式弯举", sets: "3", reps: "12 次", rest: "45 秒", tip: "前臂饱满感" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "60 分钟",
          exercises: [
            { name: "深蹲", sets: "4", reps: "12 次", rest: "75 秒", tip: "中等重量控制感" },
            { name: "弓步蹲", sets: "3", reps: "每腿 12 次", rest: "60 秒", tip: "协调和线条" },
            { name: "腿屈伸", sets: "3", reps: "15 次", rest: "45 秒", tip: "股四头线条" },
            { name: "臀桥", sets: "3", reps: "20 次", rest: "45 秒", tip: "顶端充分收缩" },
            { name: "相扑深蹲", sets: "3", reps: "15 次", rest: "45 秒", tip: "内侧和臀部" },
            { name: "卷腹 + 俄罗斯转体（超级组）", sets: "3", reps: "各 15 次", rest: "30 秒", tip: "腹肌线条" },
          ],
        },
      ],
    },
    有经验: {
      name: "塑形三分化（进阶版）",
      desc: "结合力量和高强度动作，最大化肌肉线条和体型美感",
      days: [
        {
          day: "第 1 天",
          label: "推（胸 + 肩 + 三头）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "胸大肌、三角肌、肱三头肌",
          duration: "70 分钟",
          exercises: [
            { name: "杠铃卧推", sets: "4", reps: "10 次", rest: "75 秒", tip: "力量基础" },
            { name: "上斜哑铃卧推", sets: "3", reps: "12 次", rest: "60 秒", tip: "上胸饱满" },
            { name: "哑铃飞鸟", sets: "3", reps: "15 次", rest: "45 秒", tip: "拉伸和挤压" },
            { name: "绳索夹胸", sets: "3", reps: "15 次", rest: "45 秒", tip: "内侧线条" },
            { name: "站姿杠铃推举", sets: "4", reps: "10 次", rest: "75 秒", tip: "肩部力量" },
            { name: "侧平举（4 秒下放）", sets: "3", reps: "12 次", rest: "45 秒", tip: "慢下放刺激更大" },
            { name: "俯身飞鸟", sets: "3", reps: "15 次", rest: "45 秒", tip: "后束圆润感" },
            { name: "颅骨碎裂者 + 绳索下压（超级组）", sets: "3", reps: "各 12 次", rest: "45 秒", tip: "三头爆炸" },
          ],
        },
        {
          day: "第 2 天",
          label: "拉（背 + 二头）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "背阔肌、斜方肌、肱二头肌",
          duration: "70 分钟",
          exercises: [
            { name: "引体向上", sets: "4", reps: "8 次", rest: "90 秒", tip: "背部宽度" },
            { name: "杠铃俯身划船", sets: "4", reps: "10 次", rest: "75 秒", tip: "背部厚度" },
            { name: "下拉机（反握）", sets: "3", reps: "12 次", rest: "60 秒", tip: "下背拉伸" },
            { name: "坐姿绳索划船", sets: "3", reps: "12 次", rest: "60 秒", tip: "中背收缩" },
            { name: "面拉", sets: "3", reps: "15 次", rest: "45 秒", tip: "后束和肩健康" },
            { name: "杠铃弯举", sets: "3", reps: "10 次", rest: "60 秒", tip: "二头力量" },
            { name: "集中弯举（4 秒下放）", sets: "3", reps: "12 次", rest: "45 秒", tip: "峰值收缩" },
            { name: "锤式弯举", sets: "3", reps: "12 次", rest: "45 秒", tip: "手臂饱满" },
          ],
        },
        {
          day: "第 3 天",
          label: "腿（腿 + 臀 + 腹）",
          color: "from-purple-500/20 to-purple-900/10 border-purple-500/30",
          muscles: "股四头肌、臀大肌、腘绳肌、腹肌",
          duration: "75 分钟",
          exercises: [
            { name: "深蹲", sets: "4", reps: "10 次", rest: "90 秒", tip: "力量基础" },
            { name: "保加利亚分腿蹲", sets: "3", reps: "每腿 10 次", rest: "75 秒", tip: "线条塑形极佳" },
            { name: "腿屈伸（4 秒下放）", sets: "3", reps: "15 次", rest: "60 秒", tip: "股四头深度" },
            { name: "腿弯举", sets: "3", reps: "12 次", rest: "60 秒", tip: "后腿线条" },
            { name: "罗马尼亚硬拉", sets: "3", reps: "12 次", rest: "60 秒", tip: "腘绳拉伸" },
            { name: "杠铃臀推", sets: "4", reps: "12 次", rest: "60 秒", tip: "臀部形状" },
            { name: "绳索后踢腿", sets: "3", reps: "每腿 15 次", rest: "45 秒", tip: "臀部孤立" },
            { name: "悬挂举腿 + 卷腹（超级组）", sets: "3", reps: "各 12 次", rest: "30 秒", tip: "腹肌线条" },
          ],
        },
      ],
    },
  },
};

const weekSchedule = ["第一天 ✅", "第二天 ✅", "第三天 ✅", "休息 😴", "休息 😴", "可选加练", "休息 😴"];

function DayCard({ day }: { day: typeof plans["减脂"]["新手"]["days"][0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-3xl border bg-gradient-to-br ${day.color} overflow-hidden`}>
      <button
        className="w-full text-left p-6 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-xs font-semibold text-gray-400 mb-1">{day.day}</div>
          <div className="text-xl font-black text-white mb-1">{day.label}</div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              {day.muscles}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {day.duration}
            </span>
          </div>
        </div>
        {open ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-white/10 pt-4">
          <div className="space-y-3">
            {day.exercises.map((ex, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-black/30">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="text-white font-semibold">{ex.name}</span>
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-lg shrink-0">
                      {ex.sets} 组 × {ex.reps}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>休息 {ex.rest}</span>
                    <span>·</span>
                    <span className="text-yellow-400/80">💡 {ex.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanPage() {
  const [goal, setGoal] = useState<Goal>("增肌");
  const [level, setLevel] = useState<Level>("新手");

  const plan = plans[goal][level];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">三分化训练计划</span>
        </h1>
        <p className="text-gray-400">每周练 3 天，按照推 / 拉 / 腿来分配肌群，是最高效的训练方式之一</p>
      </div>

      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            我的目标
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["减脂", "增肌", "塑形"] as Goal[]).map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`py-2 rounded-xl text-sm font-medium transition-all ${
                  goal === g ? "bg-green-500 text-black" : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            我的经验
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["新手", "有经验"] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`py-2 rounded-xl text-sm font-medium transition-all ${
                  level === l ? "bg-green-500 text-black" : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {l === "新手" ? "新手（练不到 1 年）" : "有经验（1 年以上）"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan header */}
      <div className="mb-6 p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
        <h2 className="text-xl font-black text-white mb-2">{plan.name}</h2>
        <p className="text-gray-400 text-sm">{plan.desc}</p>
      </div>

      {/* Weekly schedule */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">建议一周安排</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekSchedule.map((d, i) => (
            <div key={i} className={`text-center p-2 rounded-xl text-xs font-medium ${
              i < 3 ? "bg-green-500/20 text-green-400" : i === 5 ? "bg-yellow-500/20 text-yellow-400" : "bg-white/5 text-gray-500"
            }`}>
              {["一", "二", "三", "四", "五", "六", "日"][i]}
              <div className="mt-1 text-[10px] opacity-80">{d.split(" ")[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Training days */}
      <div className="space-y-4">
        {plan.days.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="font-bold text-white mb-3">📌 三分化训练注意事项</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>· 三天之间尽量有一天休息，不要连续三天练</li>
          <li>· 每次训练前 5 分钟热身（慢跑或动态拉伸）</li>
          <li>· 每次训练后 5 分钟拉伸刚练过的肌群</li>
          <li>· 保证每天睡够 7-8 小时，睡眠是肌肉生长的关键</li>
          <li>· 蛋白质摄入每公斤体重 1.6-2g，是增肌减脂都需要的</li>
          <li>· 记录每次训练重量，下次尽量比上次多一点点</li>
        </ul>
      </div>
    </div>
  );
}

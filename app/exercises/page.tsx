"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Target, RotateCcw } from "lucide-react";

const muscleGroups = ["全部", "胸肌", "背部", "肩膀", "二头肌", "三头肌", "腹肌", "腿部", "臀部"];

const exercises = [
  // ─── 胸肌 ────────────────────────────────────────────
  {
    name: "杠铃卧推",
    muscle: "胸肌",
    equipment: "杠铃 + 卧推凳",
    sets: "4 组",
    reps: "6-10 次",
    level: "初级",
    steps: [
      "躺在卧推凳上，背部完全贴紧凳面，双脚踩地",
      "握距比肩膀略宽，手腕保持中立不要弯曲",
      "深吸气，缓慢将杠铃放到乳头位置",
      "屏气发力推起，推到顶端时呼气，轻微夹胸",
    ],
    tips: "不要完全放松在胸口弹起来，要感受胸肌的控制",
    target: "胸大肌（中部）、三角肌前束、三头肌",
  },
  {
    name: "上斜哑铃卧推",
    muscle: "胸肌",
    equipment: "哑铃 + 上斜凳（30-45°）",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "将凳子调成 30-45 度斜角，靠上坐好",
      "哑铃放在大腿上，借助腿部弹力将哑铃举到肩膀两侧",
      "手肘微微向外展，将哑铃推向头顶斜上方",
      "顶端停留一秒，缓慢下放到感受胸肌拉伸",
    ],
    tips: "角度不要超过 45 度，否则变成练肩膀了",
    target: "胸大肌（上部）、三角肌前束",
  },
  {
    name: "下斜杠铃卧推",
    muscle: "胸肌",
    equipment: "杠铃 + 下斜凳",
    sets: "3 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "头朝下躺在下斜凳上，脚勾住挡板固定身体",
      "握距比平推略窄，手腕保持中立",
      "将杠铃下放到胸口下方（锁骨以下）",
      "发力推起，感受胸肌下部收缩",
    ],
    tips: "头朝下血液会冲到头部，动作不要太快",
    target: "胸大肌（下部）、三头肌",
  },
  {
    name: "哑铃飞鸟",
    muscle: "胸肌",
    equipment: "哑铃 + 平凳",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "躺在平凳上，双手各握哑铃，举到胸口正上方，掌心相对",
      "肘部保持微弯（不要锁死），像张开翅膀一样向两侧展开",
      "感受胸肌充分拉伸后，用夹胸的力量把哑铃合回来",
      "回到顶端时像在抱一棵大树，不要完全并拢",
    ],
    tips: "这是拉伸动作，重量要轻，感受比重量更重要",
    target: "胸大肌（内侧）、胸小肌",
  },
  {
    name: "绳索夹胸",
    muscle: "胸肌",
    equipment: "绳索机（高位）",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站在绳索机中间，两侧高位绳索各握一个",
      "身体微微前倾，手臂向前向下画弧",
      "在身体前方手背相碰或交叉，充分夹紧胸肌",
      "缓慢回放，感受胸肌的拉伸",
    ],
    tips: "手在前方交叉可以让胸肌收缩更充分",
    target: "胸大肌（内侧、下部）",
  },
  {
    name: "俯卧撑",
    muscle: "胸肌",
    equipment: "无需器械",
    sets: "3-4 组",
    reps: "10-20 次",
    level: "初级",
    steps: [
      "双手与肩同宽撑地，手指朝前或微微向外",
      "身体从头到脚跟保持一条直线，核心收紧",
      "弯曲肘部缓慢下压，胸口几乎触地",
      "用胸部力量推起，顶端夹紧胸肌",
    ],
    tips: "手越宽越练胸肌，手越窄越练三头肌",
    target: "胸大肌、三头肌、三角肌前束",
  },
  {
    name: "双杠臂屈伸（胸肌版）",
    muscle: "胸肌",
    equipment: "双杠",
    sets: "3 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "撑上双杠，身体微微前倾（这样练胸，直立练三头）",
      "手肘向外展开，缓慢弯曲肘部下降",
      "下降到感受胸肌充分拉伸，大约前臂与地面平行",
      "用胸部力量推起，不要完全锁肘",
    ],
    tips: "身体越前倾越练胸，越直立越练三头",
    target: "胸大肌（下部）、三头肌",
  },

  // ─── 背部 ────────────────────────────────────────────
  {
    name: "引体向上",
    muscle: "背部",
    equipment: "单杠",
    sets: "3-4 组",
    reps: "6-10 次",
    level: "中级",
    steps: [
      "双手握住单杠，掌心朝外（正握），握距与肩同宽",
      "身体自然下垂，肩膀略微下沉而不是耸肩",
      "想象把肘部往后下方收，而不是用手腕拉",
      "拉到下巴超过单杠，缓慢下放保持张力",
    ],
    tips: "做不了的话先练辅助引体或反握，逐步建立背部力量",
    target: "背阔肌、斜方肌中下部、二头肌",
  },
  {
    name: "下拉机（宽握）",
    muscle: "背部",
    equipment: "高位下拉机",
    sets: "3-4 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "坐在下拉机前，大腿固定在挡板下方，上身微微后仰",
      "宽握握住横杆，掌心朝外",
      "下拉到锁骨或上胸位置，同时想象肘部向下向后收",
      "缓慢回放，感受背阔肌充分拉伸",
    ],
    tips: "下拉时上身不要大幅度后仰借力，用背部控制",
    target: "背阔肌、大圆肌、二头肌",
  },
  {
    name: "坐姿绳索划船",
    muscle: "背部",
    equipment: "绳索机 + 坐姿划船座",
    sets: "3-4 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "坐在划船机上，双脚踩住脚踏板，膝盖微弯",
      "拉住手柄，上身保持直立，核心收紧",
      "向后拉到腹部，同时挤压背部中间肌肉，肘部贴身",
      "缓慢回放，上身可以微微前倾拉伸背部",
    ],
    tips: "拉到最后时停留一秒，想象把两边肩胛骨夹在一起",
    target: "背阔肌、斜方肌中部、菱形肌",
  },
  {
    name: "杠铃俯身划船",
    muscle: "背部",
    equipment: "杠铃",
    sets: "4 组",
    reps: "6-10 次",
    level: "中级",
    steps: [
      "站立，双脚与髋同宽，俯身约 45 度，背部挺直",
      "双手握住杠铃，握距与肩同宽，正握",
      "将杠铃拉向腹部下方，肘部贴近身体两侧",
      "顶端夹紧背部，缓慢下放到手臂伸直",
    ],
    tips: "保持腰背中立，不要弓腰，可以微微屈膝减轻腰部压力",
    target: "背阔肌、斜方肌、菱形肌、二头肌",
  },
  {
    name: "哑铃单臂划船",
    muscle: "背部",
    equipment: "哑铃 + 平凳",
    sets: "3 组",
    reps: "每侧 10-12 次",
    level: "初级",
    steps: [
      "一手一膝撑在凳子上，另一只手握哑铃自然下垂",
      "拉起哑铃到腰部两侧，肘部向上超过背部",
      "顶端停留一秒，感受背阔肌收缩",
      "缓慢下放直到手臂完全伸直",
    ],
    tips: "不要转动上身借力，专注用背部拉而不是手臂",
    target: "背阔肌、大圆肌",
  },
  {
    name: "硬拉",
    muscle: "背部",
    equipment: "杠铃",
    sets: "3-4 组",
    reps: "5-8 次",
    level: "中级",
    steps: [
      "杠铃放在脚踝前，双脚与髋同宽，脚尖微外展",
      "屈髋屈膝抓住杠铃，背部挺直，胸口朝前",
      "深吸气撑住腹压，用腿部力量站起来，杠铃贴腿而上",
      "站直后髋部向前顶，缓慢以同样路线放下",
    ],
    tips: "全程保持脊椎中立是最重要的，重量是次要的",
    target: "竖脊肌、背阔肌、臀大肌、腘绳肌、股四头肌",
  },
  {
    name: "面拉",
    muscle: "背部",
    equipment: "绳索机（高位）",
    sets: "3 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "面对绳索机站立，高位绳索用绳子附件握住",
      "手肘与肩同高，将绳子拉向脸部两侧",
      "到达耳朵两侧时停留，感受后肩和斜方肌收缩",
      "缓慢回放，保持肘部高度不要降低",
    ],
    tips: "这个动作对改善驼背和肩膀问题非常有效，建议每次都练",
    target: "三角肌后束、斜方肌中部、菱形肌",
  },
  {
    name: "T 杆划船",
    muscle: "背部",
    equipment: "T 杆划船机",
    sets: "4 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "站上 T 杆机踏板，俯身抓住手柄，背部挺直",
      "将 T 杆拉向胸部，肘部沿身体两侧向后",
      "顶端时挤压肩胛骨，感受背部中央收缩",
      "缓慢下放到手臂完全伸直",
    ],
    tips: "比杠铃划船更稳定，适合专注感受背部收缩",
    target: "背阔肌、斜方肌、菱形肌",
  },

  // ─── 肩膀 ────────────────────────────────────────────
  {
    name: "坐姿哑铃肩推",
    muscle: "肩膀",
    equipment: "哑铃 + 有靠背凳",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "坐在有靠背的凳上，哑铃举到肩膀两侧，掌心朝前",
      "肘部与地面垂直，大臂与地面平行",
      "用力将哑铃向头顶推，双臂在顶端几乎伸直（不完全锁肘）",
      "缓慢下放回到肩膀高度，感受三角肌拉伸",
    ],
    tips: "用有靠背的凳可以减少腰部受力，让力量更集中在肩膀",
    target: "三角肌前束和中束、三头肌",
  },
  {
    name: "站姿杠铃推举",
    muscle: "肩膀",
    equipment: "杠铃",
    sets: "4 组",
    reps: "5-8 次",
    level: "中级",
    steps: [
      "站立，杠铃放在上胸前，握距略宽于肩膀",
      "核心收紧，臀部收紧，保持身体稳定",
      "将杠铃垂直推向头顶，头部微微后移让杠铃通过",
      "锁臂后缓慢下放，杠铃回到锁骨位置",
    ],
    tips: "站姿推举可以用更大重量，是肩膀的基础力量动作",
    target: "三角肌（全部）、三头肌、核心",
  },
  {
    name: "侧平举",
    muscle: "肩膀",
    equipment: "哑铃",
    sets: "3-4 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站立，双手各握哑铃，自然垂放在身体两侧",
      "肘部保持微弯，像端盘子一样向两侧抬起",
      "抬到与肩膀齐平，拇指端略微下沉（像倒水的姿势）",
      "缓慢控制下放，不要靠惯性甩",
    ],
    tips: "用轻一点的重量，标准比重量重要。最容易练错的动作之一",
    target: "三角肌中束",
  },
  {
    name: "前平举",
    muscle: "肩膀",
    equipment: "哑铃 / 杠铃片",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站立，双手各握哑铃，放在大腿前方",
      "手臂微弯，向正前方抬起到肩膀高度",
      "停留一秒，缓慢下放",
      "可以交替做也可以同时做",
    ],
    tips: "不要超过肩膀高度，否则开始用到斜方肌借力",
    target: "三角肌前束",
  },
  {
    name: "俯身飞鸟（后束）",
    muscle: "肩膀",
    equipment: "哑铃",
    sets: "3 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "俯身 90 度或坐在凳子上身体前倾，哑铃垂在身体下方",
      "手肘微弯，向两侧将哑铃平举抬起",
      "抬到与背部齐平时感受后肩收缩",
      "缓慢下放",
    ],
    tips: "三角肌后束最容易被忽视，但对肩膀的圆润和健康很关键",
    target: "三角肌后束、斜方肌",
  },
  {
    name: "直立划船",
    muscle: "肩膀",
    equipment: "杠铃 / 哑铃",
    sets: "3 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "站立，双手窄握杠铃放在大腿前方",
      "将杠铃沿身体贴近向上拉，肘部始终高于手腕",
      "拉到下巴高度时停留一秒",
      "缓慢下放",
    ],
    tips: "握距不要太窄，否则肩膀内旋会有受伤风险",
    target: "三角肌中束、斜方肌上部",
  },

  // ─── 二头肌 ────────────────────────────────────────────
  {
    name: "杠铃弯举",
    muscle: "二头肌",
    equipment: "杠铃 / EZ 杆",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "初级",
    steps: [
      "站立，双手握住杠铃，握距与肩同宽，掌心朝上",
      "上臂贴紧身体两侧，保持固定不动",
      "弯曲肘部将杠铃举到肩膀高度",
      "顶端收缩一秒，缓慢下放直到完全伸直",
    ],
    tips: "EZ 杆对手腕更友好，如果杠铃让手腕不舒服就换 EZ 杆",
    target: "肱二头肌、肱肌",
  },
  {
    name: "哑铃弯举",
    muscle: "二头肌",
    equipment: "哑铃",
    sets: "3 组",
    reps: "10-15 次",
    level: "初级",
    steps: [
      "站立或坐在凳子上，双手各握哑铃，掌心朝上",
      "上臂贴紧身体，交替或同时弯举",
      "在顶端将手腕微微旋转（小指朝外），加强收缩",
      "缓慢下放，感受完整拉伸",
    ],
    tips: "哑铃可以旋转手腕，比杠铃能更好地孤立二头肌",
    target: "肱二头肌",
  },
  {
    name: "锤式弯举",
    muscle: "二头肌",
    equipment: "哑铃",
    sets: "3 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "站立，双手各握哑铃，掌心相对（大拇指朝上）",
      "上臂固定，弯举到肩膀高度",
      "缓慢下放",
    ],
    tips: "锤握侧重肱肌和前臂，让手臂看起来更饱满",
    target: "肱肌、肱桡肌、肱二头肌",
  },
  {
    name: "上斜哑铃弯举",
    muscle: "二头肌",
    equipment: "哑铃 + 上斜凳",
    sets: "3 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "将凳子调成 45-60 度，靠上坐好，手臂自然下垂",
      "上臂不动，弯举哑铃到肩膀高度",
      "顶端停留感受收缩，缓慢下放到完全伸直",
    ],
    tips: "上斜角度让二头肌在拉伸位置更受力，孤立效果极好",
    target: "肱二头肌长头（外侧）",
  },
  {
    name: "牧师椅弯举",
    muscle: "二头肌",
    equipment: "EZ 杆 + 牧师椅",
    sets: "3 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "坐在牧师椅前，上臂靠在斜面上固定",
      "握住 EZ 杆，手臂伸直为起始位置",
      "弯举到手臂约 90 度时停留，不要完全收到顶",
      "缓慢完全下放",
    ],
    tips: "上臂靠在斜面上可以防止借力，专注孤立二头肌",
    target: "肱二头肌",
  },
  {
    name: "集中弯举",
    muscle: "二头肌",
    equipment: "哑铃",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "坐在凳子上，一只手持哑铃，肘部靠在同侧大腿内侧",
      "手臂完全伸直为起始",
      "慢慢弯举到最高点，感受二头肌峰值收缩",
      "缓慢下放",
    ],
    tips: "集中弯举是为了练出二头肌的峰值（高度），慢做效果最好",
    target: "肱二头肌（特别是峰值）",
  },

  // ─── 三头肌 ────────────────────────────────────────────
  {
    name: "绳索下压",
    muscle: "三头肌",
    equipment: "绳索机（高位）",
    sets: "3-4 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站在绳索机前，高位绳索附件握住（绳子或直杆）",
      "上臂贴紧身体，肘部固定在腰侧",
      "向下压到手臂完全伸直，感受三头肌收缩",
      "缓慢回放到前臂与上臂约 90 度",
    ],
    tips: "用绳子附件可以在底部翻转手腕，更好地收缩三头肌",
    target: "肱三头肌（三个头都练到）",
  },
  {
    name: "颅骨碎裂者",
    muscle: "三头肌",
    equipment: "EZ 杆 + 平凳",
    sets: "3 组",
    reps: "10-12 次",
    level: "中级",
    steps: [
      "躺在平凳上，将 EZ 杆举到胸口正上方",
      "只弯曲肘部，将杠铃缓慢降低到额头上方",
      "上臂保持垂直固定，只靠肘部弯曲控制",
      "三头肌发力将杠铃推回到起始位置",
    ],
    tips: "重量要保守，这个动作肘部关节受力很大",
    target: "肱三头肌长头",
  },
  {
    name: "过头三头伸展",
    muscle: "三头肌",
    equipment: "哑铃 / 绳索",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "站立或坐着，双手握住一个哑铃举过头顶",
      "上臂保持竖直夹着耳朵，只弯曲肘部让哑铃下落到脑后",
      "三头肌发力将哑铃推回头顶",
    ],
    tips: "长头在手臂举过头时才能充分拉伸，所以过头动作很重要",
    target: "肱三头肌长头（最大那个头）",
  },
  {
    name: "窄距卧推",
    muscle: "三头肌",
    equipment: "杠铃 + 平凳",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "躺在平凳上，双手握距比肩膀窄（两手间距约 20-30cm）",
      "将杠铃下放到胸口中央，肘部紧贴身体两侧",
      "三头肌发力推起，注意肘部不要外展",
    ],
    tips: "手不要太窄否则手腕不适，20-30cm 的间距刚好",
    target: "肱三头肌（全部）、胸肌内侧",
  },
  {
    name: "俯身臂屈伸",
    muscle: "三头肌",
    equipment: "哑铃",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "一手扶凳，对侧手持哑铃，俯身让上身平行地面",
      "上臂抬起与地面平行，肘部弯曲约 90 度",
      "向后伸直手臂，感受三头肌顶端收缩",
      "缓慢弯曲肘部回到起始",
    ],
    tips: "重量要轻，感受三头肌在顶端的收缩是这个动作的关键",
    target: "肱三头肌（特别是外侧头）",
  },
  {
    name: "双杠臂屈伸（三头版）",
    muscle: "三头肌",
    equipment: "双杠",
    sets: "3 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "撑上双杠，身体保持直立（不要前倾）",
      "手肘向后弯曲，缓慢下降",
      "下降到肘关节约 90 度",
      "三头肌发力推起到手臂伸直",
    ],
    tips: "直立身体是练三头的关键，前倾变成练胸肌了",
    target: "肱三头肌",
  },

  // ─── 腹肌 ────────────────────────────────────────────
  {
    name: "平板支撑",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3 组",
    reps: "30-60 秒",
    level: "初级",
    steps: [
      "肘部撑地，肘关节在肩膀正下方",
      "脚尖撑地，身体呈一条直线",
      "收紧腹部、夹紧臀部，不要塌腰或翘臀",
      "保持正常呼吸，坚持目标时间",
    ],
    tips: "质量比时间更重要，腰部下沉就停下来",
    target: "腹横肌、腹直肌、竖脊肌",
  },
  {
    name: "卷腹",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3-4 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "躺地，双膝弯曲，双手轻放耳朵两侧",
      "用腹肌将上背部卷起，不是用脖子拉",
      "顶端感受腹肌收缩，停留 1 秒",
      "缓慢下放，背部不要完全贴回地面（保持张力）",
    ],
    tips: "幅度不用很大，重要的是腹肌主动发力收缩",
    target: "腹直肌上部",
  },
  {
    name: "悬挂举腿",
    muscle: "腹肌",
    equipment: "单杠",
    sets: "3 组",
    reps: "10-15 次",
    level: "中级",
    steps: [
      "双手悬挂在单杠上，身体自然下垂",
      "核心收紧，双腿并拢向上抬起",
      "抬到大腿与地面平行或更高",
      "缓慢控制下放，不要甩动",
    ],
    tips: "如果做不到直腿，先从弯膝举腿开始",
    target: "腹直肌下部、腹横肌、髂腰肌",
  },
  {
    name: "俄罗斯转体",
    muscle: "腹肌",
    equipment: "无需器械 / 哑铃",
    sets: "3 组",
    reps: "每侧 15 次",
    level: "初级",
    steps: [
      "坐在地上，膝盖弯曲，上身向后倾斜约 45 度",
      "双手合十或握哑铃",
      "左右交替扭转上身，让双手碰触两侧地面",
    ],
    tips: "脚可以抬离地面增加难度，保持核心收紧",
    target: "腹斜肌、腹直肌",
  },
  {
    name: "自行车卷腹",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3 组",
    reps: "每侧 15 次",
    level: "初级",
    steps: [
      "躺地，双手放耳朵两侧，双腿抬起离地",
      "右肘靠近左膝，同时右腿伸直",
      "换方向，左肘靠近右膝，左腿伸直",
      "交替进行，像骑自行车一样",
    ],
    tips: "速度不要太快，要感受腹斜肌真实的扭转收缩",
    target: "腹斜肌、腹直肌",
  },
  {
    name: "绳索卷腹",
    muscle: "腹肌",
    equipment: "绳索机（高位）",
    sets: "3-4 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "跪在绳索机前，双手握住绳子放在额头两侧",
      "用腹肌将上身向下卷曲，像在鞠躬",
      "到达下方时停留感受腹肌收缩",
      "缓慢回到直立，不要用背部肌肉向上起身",
    ],
    tips: "绳索卷腹可以加负重，是最好的腹肌增肌动作之一",
    target: "腹直肌",
  },
  {
    name: "登山者",
    muscle: "腹肌",
    equipment: "无需器械",
    sets: "3 组",
    reps: "每侧 20 次",
    level: "初级",
    steps: [
      "撑起俯卧撑姿势，手臂伸直，身体呈一条线",
      "交替将膝盖快速拉向胸口",
      "保持腰部稳定，核心全程收紧",
    ],
    tips: "既练腹肌又练心肺，可以当有氧也可以当力量训练",
    target: "腹直肌、腹横肌、髂腰肌",
  },

  // ─── 腿部 ────────────────────────────────────────────
  {
    name: "深蹲",
    muscle: "腿部",
    equipment: "杠铃 / 自重",
    sets: "4 组",
    reps: "6-10 次",
    level: "初级",
    steps: [
      "双脚与肩同宽或略宽，脚尖微微向外",
      "挺胸，腰背保持中立位",
      "屈膝向下蹲，膝盖跟脚尖方向保持一致",
      "蹲到大腿平行地面或更低，用腿部力量蹬起",
    ],
    tips: "膝盖不要内扣，下蹲时脚跟不要离地",
    target: "股四头肌、臀大肌、腘绳肌",
  },
  {
    name: "腿举",
    muscle: "腿部",
    equipment: "腿举机",
    sets: "4 组",
    reps: "10-15 次",
    level: "初级",
    steps: [
      "坐入腿举机，背部贴紧靠背，双脚踩在踏板上",
      "脚距与肩同宽，或更宽练臀部",
      "膝盖微弯为起始，缓慢弯曲膝盖下放",
      "下放到膝盖约 90 度，用腿部蹬回",
    ],
    tips: "不要完全锁膝，最后一点不要伸直，保持肌肉张力",
    target: "股四头肌、臀大肌（脚位越高越练臀）",
  },
  {
    name: "腿屈伸",
    muscle: "腿部",
    equipment: "腿屈伸机",
    sets: "3-4 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "坐在腿屈伸机上，脚踝放在挡板后方",
      "向上伸直双腿，顶端充分收缩股四头肌",
      "停留一秒，缓慢下放",
    ],
    tips: "这是孤立股四头肌的最好动作，但膝盖有伤者要小心",
    target: "股四头肌",
  },
  {
    name: "腿弯举（俯卧）",
    muscle: "腿部",
    equipment: "腿弯举机",
    sets: "3-4 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "俯卧在腿弯举机上，脚踝放在挡板上方",
      "向上弯曲膝盖，将挡板拉向臀部",
      "顶端停留感受腘绳肌收缩",
      "缓慢下放到完全伸直",
    ],
    tips: "腘绳肌是大腿后侧的肌肉，很多人忽略，容易导致膝盖受伤",
    target: "腘绳肌",
  },
  {
    name: "罗马尼亚硬拉",
    muscle: "腿部",
    equipment: "杠铃 / 哑铃",
    sets: "3-4 组",
    reps: "8-12 次",
    level: "中级",
    steps: [
      "站立握住杠铃，放在大腿前方",
      "保持膝盖微弯，髋部向后推，上身向前俯",
      "杠铃沿腿部下滑到小腿中部，感受腘绳肌拉伸",
      "髋部向前顶回到站立位",
    ],
    tips: "区别于普通硬拉：膝盖角度几乎不变，主要靠髋部屈伸",
    target: "腘绳肌、臀大肌、竖脊肌",
  },
  {
    name: "弓步蹲",
    muscle: "腿部",
    equipment: "无需器械 / 哑铃",
    sets: "3 组",
    reps: "每腿 10-12 次",
    level: "初级",
    steps: [
      "站立，一只脚向前迈一大步",
      "弯曲前膝直到大腿平行地面",
      "后膝几乎触地，上身保持直立",
      "蹬起前脚，收回站立，换腿重复",
    ],
    tips: "前膝不要超过脚尖太多，保持重心在前脚跟",
    target: "股四头肌、臀大肌、腘绳肌",
  },
  {
    name: "保加利亚分腿蹲",
    muscle: "腿部",
    equipment: "哑铃 + 凳子",
    sets: "3 组",
    reps: "每腿 8-12 次",
    level: "中级",
    steps: [
      "背对凳子，一只脚的脚背搭在凳子上",
      "前脚向前迈一步，距离够大让膝盖不超过脚尖",
      "弯曲前腿下蹲，后膝接近地面",
      "前腿蹬起，顶端收紧臀部",
    ],
    tips: "这个动作对平衡要求高，先从徒手练，熟了再加哑铃",
    target: "股四头肌、臀大肌（效果极好）",
  },
  {
    name: "小腿提踵",
    muscle: "腿部",
    equipment: "台阶 / 提踵机",
    sets: "4 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "脚尖踩在台阶边缘，脚跟悬空",
      "脚跟尽量下沉，感受小腿充分拉伸",
      "用小腿力量将身体向上推，脚尖踮到最高",
      "顶端停留一秒，缓慢下放",
    ],
    tips: "小腿肌肉很顽强，需要大重量或高次数才能有刺激",
    target: "腓肠肌、比目鱼肌",
  },
  {
    name: "哈克深蹲",
    muscle: "腿部",
    equipment: "哈克深蹲机",
    sets: "3-4 组",
    reps: "10-12 次",
    level: "初级",
    steps: [
      "背部贴紧机器靠背，肩膀放入肩垫",
      "双脚踩在踏板上，略宽于肩，脚尖微外",
      "弯曲膝盖向下蹲，到大腿平行地面",
      "腿部蹬起，不要完全锁膝",
    ],
    tips: "比自由深蹲更安全，适合腰部有问题的人",
    target: "股四头肌、臀大肌",
  },

  // ─── 臀部 ────────────────────────────────────────────
  {
    name: "臀推（杠铃）",
    muscle: "臀部",
    equipment: "杠铃 + 平凳",
    sets: "4 组",
    reps: "10-15 次",
    level: "中级",
    steps: [
      "上背部靠在平凳边缘，杠铃横放在髋骨上方（用海绵垫保护）",
      "双脚踩地与髋同宽，膝盖弯曲约 90 度",
      "夹紧臀部，将髋部向上推到与地面平行",
      "顶端停留 1-2 秒，缓慢下放",
    ],
    tips: "这是练臀最有效的动作，没有之一。充分的顶端收缩是关键",
    target: "臀大肌（极佳）、腘绳肌",
  },
  {
    name: "臀桥",
    muscle: "臀部",
    equipment: "无需器械",
    sets: "3 组",
    reps: "15-20 次",
    level: "初级",
    steps: [
      "躺地，双膝弯曲，脚跟踩地靠近臀部",
      "双手平放在身体两侧",
      "夹紧臀部，将臀部抬离地面到与大腿成直线",
      "顶部停留 1-2 秒，缓慢下放",
    ],
    tips: "是臀推的入门版，掌握动作感觉后换成杠铃臀推",
    target: "臀大肌、腘绳肌",
  },
  {
    name: "绳索后踢腿",
    muscle: "臀部",
    equipment: "绳索机（低位）",
    sets: "3 组",
    reps: "每腿 15 次",
    level: "初级",
    steps: [
      "将绳索踝关节绑带固定在一只脚踝上",
      "面对绳索机站立，扶好支撑",
      "向后踢腿到感受臀部充分收缩，腿不要弯曲",
      "控制回到起始，换腿",
    ],
    tips: "这是雕刻臀部形状很好的孤立动作，重量不用大",
    target: "臀大肌",
  },
  {
    name: "相扑深蹲",
    muscle: "臀部",
    equipment: "哑铃 / 壶铃",
    sets: "3 组",
    reps: "12-15 次",
    level: "初级",
    steps: [
      "双脚大幅度分开（比肩宽约一倍），脚尖向外 45 度",
      "双手握住一个哑铃垂在两腿中间",
      "屈膝下蹲，保持背部挺直，膝盖对准脚尖方向",
      "腿部发力起身，顶端夹紧臀部",
    ],
    tips: "宽脚距能更好地激活大腿内侧和臀部",
    target: "臀大肌、大腿内收肌、股四头肌",
  },
  {
    name: "驴踢",
    muscle: "臀部",
    equipment: "无需器械",
    sets: "3 组",
    reps: "每腿 20 次",
    level: "初级",
    steps: [
      "四肢着地，手在肩膀下方，膝盖在髋下方",
      "一腿保持膝盖弯曲，向上踢起到与背部平行",
      "顶端充分收缩臀部，停留一秒",
      "缓慢下放，换腿",
    ],
    tips: "可以在脚踝加弹力带增加阻力，提升效果",
    target: "臀大肌",
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
                <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
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
  const [search, setSearch] = useState("");

  const filtered = exercises.filter((e) => {
    const matchGroup = activeGroup === "全部" || e.muscle === activeGroup;
    const matchSearch = search === "" || e.name.includes(search) || e.target.includes(search);
    return matchGroup && matchSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span className="gradient-text">动作库</span>
        </h1>
        <p className="text-gray-400">共 {exercises.length} 个动作 · 点击展开步骤说明</p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索动作名称..."
        className="w-full mb-5 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
      />

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
            <span className="ml-1.5 text-xs opacity-60">
              {group === "全部" ? exercises.length : exercises.filter(e => e.muscle === group).length}
            </span>
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
        <div className="text-center py-20 text-gray-500">没找到匹配的动作</div>
      )}
    </div>
  );
}

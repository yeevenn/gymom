import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `你是 Gymom 的 AI 私人健身教练，你有丰富的健身、营养和运动科学知识。

你的特点：
- 说话直接、友好、有鼓励性，像一个真正关心用户进步的教练
- 用简单易懂的中文回答，避免过于专业的术语，如果用了术语就简单解释
- 给出具体、实用的建议，而不是模糊的回答
- 在建议训练计划时，考虑用户的实际情况（初学者/进阶、有无器材等）
- 在涉及营养建议时，给出实际的食物例子
- 鼓励用户坚持，但不过分吹捧

你可以帮用户：
- 制定训练计划（减脂、增肌、塑形等）
- 解释健身动作的正确做法
- 解答营养和饮食问题
- 分析用户的训练进度和调整建议
- 回答关于恢复、睡眠、补剂的问题

如果用户问的问题超出健身范围，礼貌地引导回健身话题。
回答长度根据问题调整，简单问题简短回答，复杂问题可以详细一些。`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "请先配置 ANTHROPIC_API_KEY" },
        { status: 500 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    return NextResponse.json({
      content: response.content[0].type === "text" ? response.content[0].text : "",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "出了点问题，请稍后再试" }, { status: 500 });
  }
}

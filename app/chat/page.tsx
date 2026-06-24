"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Dumbbell } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "我想减脂，帮我安排一周训练计划",
  "新手怎么开始健身？",
  "增肌应该怎么吃？",
  "深蹲动作不标准怎么改正？",
  "每天练多长时间比较好？",
  "腹肌怎么练才有效？",
];

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${
          isUser ? "bg-green-500" : "bg-white/10"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-black" />
        ) : (
          <Bot className="w-5 h-5 text-green-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-green-500 text-black rounded-tr-sm"
            : "bg-white/10 text-gray-200 rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: `❌ ${data.error}` }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.content }]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "网络出了点问题，请刷新页面重试。" },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Dumbbell className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AI 私人教练</h1>
          <p className="text-sm text-gray-400">随时问我关于健身的任何问题</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          在线
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scroll space-y-5 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
              <Bot className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">你好，我是你的 AI 教练</h2>
            <p className="text-gray-400 text-sm mb-8">
              告诉我你的健身目标，我来帮你制定计划
            </p>

            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-green-500/30 hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 shrink-0 flex items-center justify-center">
              <Bot className="w-5 h-5 text-green-400" />
            </div>
            <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 bg-white/5 border border-white/20 rounded-2xl flex items-end gap-3 p-3 focus-within:border-green-500/50 transition-colors">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="问我任何健身问题... (Enter 发送，Shift+Enter 换行)"
          rows={1}
          className="flex-1 bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none text-sm leading-6 max-h-32 overflow-y-auto"
          style={{ minHeight: "24px" }}
          onInput={(e) => {
            const t = e.target as HTMLTextAreaElement;
            t.style.height = "24px";
            t.style.height = `${Math.min(t.scrollHeight, 128)}px`;
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
        >
          <Send className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}

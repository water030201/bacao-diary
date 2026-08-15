import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import DiaryCard from "../components/diary/DiaryCard";
import BrutalInput from "../components/ui/BrutalInput";
import { getDiaries } from "../lib/storage";
import { useSpeech } from "../hooks/useSpeech";

export default function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const { transcript, isListening, isSupported, error, start, stop, reset } = useSpeech();
  const wasListeningRef = useRef(false);

  useEffect(() => {
    if (transcript) setQuery(transcript);
  }, [transcript]);

  useEffect(() => {
    if (wasListeningRef.current && !isListening && transcript.trim()) {
      setSearchParams({ q: transcript.trim() });
      reset();
    }
    wasListeningRef.current = isListening;
  }, [isListening, transcript, setSearchParams, reset]);

  const diaries = getDiaries();
  const results = query
    ? diaries.filter((d) => {
        const q = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.productName.toLowerCase().includes(q) ||
          d.experience.toLowerCase().includes(q) ||
          d.productCategory.toLowerCase().includes(q)
        );
      })
    : [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams({ q: query });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">🔍 搜索</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1">
            <BrutalInput
              placeholder={isListening ? "🔴 正在聆听... 说出你要搜的内容" : "搜索商品、日记..."}
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
          </div>
          {isSupported && (
            <motion.button
              type="button"
              onClick={isListening ? stop : start}
              whileTap={{ scale: 0.92 }}
              animate={isListening ? { scale: [1, 1.08, 1] } : {}}
              transition={isListening ? { repeat: Infinity, duration: 1.2 } : {}}
              title={isListening ? "停止语音识别" : "语音搜索"}
              className={`brutal-border px-4 text-2xl cursor-pointer brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${
                isListening ? "bg-danger text-brutal-white" : "bg-brutal-white"
              }`}
            >
              🎙️
            </motion.button>
          )}
          <button type="submit" className="bg-primary brutal-border px-6 font-bold cursor-pointer brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            搜索
          </button>
        </div>
        {isListening && (
          <p className="mt-2 text-sm font-bold text-danger">🔴 松开麦克风按钮结束识别并自动搜索</p>
        )}
        {error && (
          <p className="mt-2 text-sm font-bold text-danger">⚠️ {error}</p>
        )}
      </form>

      {query && (
        <p className="text-sm text-brutal-black/50 mb-4 font-bold">
          找到 {results.length} 条关于 "{query}" 的结果
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((diary, i) => (
          <DiaryCard key={diary.id} diary={diary} index={i} />
        ))}
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🤷</p>
          <p className="text-xl font-bold text-brutal-black/50">没有找到 "{query}" 相关的日记</p>
        </div>
      )}
    </div>
  );
}

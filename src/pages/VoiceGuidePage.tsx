import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import { useSpeech } from "../hooks/useSpeech";

export default function VoiceGuidePage() {
  const { transcript, isListening, isSupported, start, stop, reset } = useSpeech();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">🎤 语音交互</h1>
      <p className="text-brutal-black/50 mb-8">动口不动手，用语音记录消费体验</p>

      <BrutalCard className="p-8 mb-8 text-center">
        <h2 className="text-2xl font-black mb-4">试试语音输入</h2>

        {!isSupported ? (
          <div className="py-8">
            <p className="text-xl mb-2">😕 你的浏览器不支持语音识别</p>
            <p className="text-brutal-black/50">请使用 Chrome 浏览器获得最佳体验</p>
          </div>
        ) : (
          <>
            <motion.button
              onClick={isListening ? stop : start}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={isListening ? { repeat: Infinity, duration: 1.5 } : {}}
              className={`w-24 h-24 text-4xl brutal-border cursor-pointer mx-auto block mb-6 transition-colors ${
                isListening ? "bg-danger text-brutal-white" : "bg-primary text-brutal-black"
              }`}
            >
              🎙️
            </motion.button>
            <p className="font-bold mb-4">
              {isListening ? "🔴 正在聆听... 说点什么吧" : "点击麦克风开始语音输入"}
            </p>
            <div className="brutal-border bg-brutal-white p-4 min-h-[100px] text-left mb-4">
              <p className={transcript ? "text-brutal-black" : "text-brutal-black/30"}>
                {transcript || "语音识别内容会显示在这里..."}
              </p>
            </div>
            {transcript && (
              <BrutalButton variant="outline" size="sm" onClick={reset}>清除内容</BrutalButton>
            )}
          </>
        )}
      </BrutalCard>

      <h2 className="text-2xl font-black mb-6">怎么使用？</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: "1", icon: "🎙️", title: "点击麦克风", desc: "在写日记页面点击语音按钮" },
          { step: "2", icon: "🗣️", title: "说出体验", desc: "用自然语言描述你的购物感受" },
          { step: "3", icon: "✨", title: "自动填写", desc: "语音识别内容自动填入输入框" },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <BrutalCard className="p-6 text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="inline-block bg-brutal-black text-brutal-white w-8 h-8 font-black text-lg leading-8 brutal-border mb-2">
                {item.step}
              </div>
              <h3 className="font-black">{item.title}</h3>
              <p className="text-sm text-brutal-black/60">{item.desc}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

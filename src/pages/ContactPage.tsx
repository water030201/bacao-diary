import { useState } from "react";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalInput from "../components/ui/BrutalInput";
import BrutalCard from "../components/ui/BrutalCard";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <p className="text-6xl mb-4">✅</p>
          <h1 className="text-3xl font-black mb-2">发送成功！</h1>
          <p className="text-brutal-black/60 mb-6">感谢你的留言，我们会尽快回复。</p>
          <BrutalButton onClick={() => setSubmitted(false)}>再写一条</BrutalButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">📮 联系我们</h1>
      <p className="text-brutal-black/50 mb-8">有建议、反馈或合作意向？给我们留言吧！</p>

      <BrutalCard className="p-6 brutal-shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <BrutalInput
            label="你的名字"
            placeholder="怎么称呼你？"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
          <BrutalInput
            label="邮箱"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <BrutalInput
            label="留言内容"
            multiline
            placeholder="说说你的想法..."
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            required
          />
          <BrutalButton type="submit" variant="dark" size="lg">发送留言 🚀</BrutalButton>
        </form>
      </BrutalCard>
    </div>
  );
}

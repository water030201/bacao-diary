import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalInput from "../components/ui/BrutalInput";
import Icon from "../components/ui/Icon";
import { getUserProfile, saveUserProfile, getDiaries } from "../lib/storage";
import { calcTotalSpent, calcRationalIndex } from "../lib/stats";
import type { UserProfile } from "../types";

const AVATARS = ["🌱", "🌿", "🍀", "🌻", "🔥", "⭐", "🎯", "🧠"];

export default function UserCenterPage() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [editing, setEditing] = useState(false);
  const diaries = getDiaries();

  function handleSave() {
    saveUserProfile(profile);
    setEditing(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8"><Icon name="user" size={28} className="inline-block" /> 个人中心</h1>

      <BrutalCard className="p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="text-6xl">{profile.avatar}</div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <BrutalInput
                  label="昵称"
                  value={profile.nickname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, nickname: e.target.value })}
                />
                <BrutalInput
                  label="简介"
                  value={profile.bio}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, bio: e.target.value })}
                />
                <div>
                  <label className="font-bold text-sm block mb-1">头像</label>
                  <div className="flex gap-2">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setProfile({ ...profile, avatar: a })}
                        className={`text-2xl p-1 cursor-pointer brutal-border ${profile.avatar === a ? "bg-primary" : "bg-brutal-white"}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <BrutalButton onClick={handleSave}>保存</BrutalButton>
                  <BrutalButton variant="outline" onClick={() => setEditing(false)}>取消</BrutalButton>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black">{profile.nickname}</h2>
                <p className="text-brutal-black/60">{profile.bio}</p>
                <BrutalButton variant="outline" size="sm" className="mt-2" onClick={() => setEditing(true)}>
                  编辑资料 <Icon name="pencil" size={14} className="inline-block" />
                </BrutalButton>
              </>
            )}
          </div>
        </div>
      </BrutalCard>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">{diaries.length}</p>
          <p className="text-xs text-brutal-black/50 font-bold">日记</p>
        </BrutalCard>
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">¥{calcTotalSpent(diaries)}</p>
          <p className="text-xs text-brutal-black/50 font-bold">累计消费</p>
        </BrutalCard>
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">{calcRationalIndex(diaries)}%</p>
          <p className="text-xs text-brutal-black/50 font-bold">理智指数</p>
        </BrutalCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { to: "/diary", label: "我的日记", icon: "notepad" as const, desc: `共 ${diaries.length} 篇` },
          { to: "/stats", label: "消费统计", icon: "chart" as const, desc: "查看分析报告" },
          { to: "/achievements", label: "我的成就", icon: "trophy" as const, desc: "看看解锁了几个" },
          { to: "/diary/new", label: "写日记", icon: "pencil" as const, desc: "记录新的消费" },
        ].map(({ to, label, icon, desc }) => (
          <Link key={to} to={to}>
            <BrutalCard hover className="p-4">
              <p className="font-black"><span className="inline-flex items-center gap-1.5"><Icon name={icon} size={18} /> {label}</span></p>
              <p className="text-xs text-brutal-black/50">{desc}</p>
            </BrutalCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

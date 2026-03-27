import DiaryForm from "../components/diary/DiaryForm";

export default function WriteDiaryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">✍️ 写拔草日记</h1>
      <div className="brutal-border bg-brutal-white p-6 brutal-shadow">
        <DiaryForm />
      </div>
    </div>
  );
}

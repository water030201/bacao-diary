import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["#00FF66", "#0A6B35", "#FFE500", "#FF3B30", "#1A1A1A", "#888", "#00CCFF", "#FF66CC"];

export default function CategoryChart({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-center text-brutal-black/50 py-8">暂无数据</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
          stroke="#1A1A1A"
          strokeWidth={2}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `¥${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

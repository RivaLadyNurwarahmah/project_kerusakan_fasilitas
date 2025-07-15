// components/FacilityChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Lab", reports: 12 },
  { name: "Kelas", reports: 18 },
  { name: "Toilet", reports: 7 },
  { name: "Perpus", reports: 4 },
];

export default function FacilityChart({data}:{data: any}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Statistik Laporan per Fasilitas</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="reports" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

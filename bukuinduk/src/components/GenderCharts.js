import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GenderCharts = ({ maleCount = 20, femaleCount = 40 }) => {
  const data = [
    { name: "Laki-laki", laki: maleCount },
    { name: "Perempuan", perempuan: femaleCount },
  ];

  return (
    <div className="w-full max-w-5xl h-96 mt-8 bg-white p-6 rounded-xl shadow-lg flex flex-col mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Distribusi Siswa</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barCategoryGap={30}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }} 
          />
          <YAxis 
            allowDecimals={false} 
            domain={[0, Math.max(maleCount, femaleCount) + 5]} 
            tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#fff", borderRadius: 8 }} 
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} 
          />
          <Legend 
            wrapperStyle={{ fontSize: 14, fontWeight: "bold", color: "#555" }} 
          />
          <Bar 
            dataKey="laki" 
            fill="url(#colorMale)" 
            name="Laki-laki" 
            barSize={60} 
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="perempuan" 
            fill="url(#colorFemale)" 
            name="Perempuan" 
            barSize={60} 
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3498db" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#2980b9" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e74c3c" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#c0392b" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderCharts;
// src/pages/Stats.jsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#7c3aed"];

export default function Stats() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [summary, setSummary] = useState({ total: 0, avg: 0, max: 0 });

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((json) => {
        const quakes = json.features.map((eq) => ({
          name: eq.properties.place?.split(",")[0] || "Unknown",
          mag: eq.properties.mag,
          time: new Date(eq.properties.time),
        }));

        // summary
        const total = quakes.length;
        const avg =
          quakes.reduce((sum, q) => sum + q.mag, 0) / quakes.length || 0;
        const max = Math.max(...quakes.map((q) => q.mag));
        setSummary({ total, avg: avg.toFixed(2), max });

        // top 10 strongest
        const top10 = [...quakes]
          .sort((a, b) => b.mag - a.mag)
          .slice(0, 10);
        setData(top10);

        // category distribution
        const categories = [
          { name: "Minor (<3)", value: quakes.filter((q) => q.mag < 3).length },
          {
            name: "Light (3-4.9)",
            value: quakes.filter((q) => q.mag >= 3 && q.mag < 5).length,
          },
          {
            name: "Moderate (5-5.9)",
            value: quakes.filter((q) => q.mag >= 5 && q.mag < 6).length,
          },
          {
            name: "Strong (6-6.9)",
            value: quakes.filter((q) => q.mag >= 6 && q.mag < 7).length,
          },
          { name: "Major (≥7)", value: quakes.filter((q) => q.mag >= 7).length },
        ];
        setCategories(categories);

        // quakes by hour
        const hourly = {};
        quakes.forEach((q) => {
          const hr = q.time.getHours();
          hourly[hr] = (hourly[hr] || 0) + 1;
        });
        const timeData = Object.keys(hourly).map((h) => ({
          hour: `${h}:00`,
          count: hourly[h],
        }));
        setTimeSeries(timeData);
      });
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          🌍 Global Earthquake Statistics (Past 24h)
        </h2>
        <p className="text-gray-400">
          Casey wants to visualize recent earthquake activity to understand
          seismic patterns across the world.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-5 rounded-2xl shadow-md text-center border border-gray-700">
          <h3 className="text-gray-400">Total Quakes</h3>
          <p className="text-3xl font-bold text-emerald-400">{summary.total}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow-md text-center border border-gray-700">
          <h3 className="text-gray-400">Avg Magnitude</h3>
          <p className="text-3xl font-bold text-blue-400">{summary.avg}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow-md text-center border border-gray-700">
          <h3 className="text-gray-400">Strongest</h3>
          <p className="text-3xl font-bold text-red-400">{summary.max}</p>
        </div>
      </div>

      {/* Top 10 Strongest Quakes */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Top 10 Strongest Quakes</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />
            <Bar dataKey="mag" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Magnitude Distribution */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Magnitude Distribution</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {categories.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Quakes by Hour */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Quakes by Hour</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={timeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="hour" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

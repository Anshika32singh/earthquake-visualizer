// src/pages/About.jsx
import { Info, Globe, BarChart3, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Info className="text-blue-400" size={24} />
          About <span className="text-red-500">QuakeTracker</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed">
          QuakeTracker is a real-time earthquake monitoring app powered by the{" "}
          <a
            href="https://earthquake.usgs.gov/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline hover:text-blue-300 transition"
          >
            USGS Earthquake API
          </a>
          . It helps students, researchers, and curious minds understand how earthquakes
          occur across the globe through interactive maps and simple data visualizations.
        </p>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-blue-500/10 transition">
            <Globe className="text-green-400 mb-2" size={28} />
            <h3 className="font-semibold text-lg text-white">🌍 Live Global Map</h3>
            <p className="text-gray-400 text-sm">
              Track earthquakes as they happen worldwide, with detailed location data.
            </p>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-red-500/10 transition">
            <BarChart3 className="text-red-400 mb-2" size={28} />
            <h3 className="font-semibold text-lg text-white">📊 Visual Stats</h3>
            <p className="text-gray-400 text-sm">
              Explore easy-to-understand charts and graphs to analyze magnitudes and
              frequencies.
            </p>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-yellow-500/10 transition">
            <Zap className="text-yellow-400 mb-2" size={28} />
            <h3 className="font-semibold text-lg text-white">⚡ Instant Updates</h3>
            <p className="text-gray-400 text-sm">
              Stay informed with real-time feeds from the USGS Earthquake Monitoring
              Center.
            </p>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/10 transition">
            <Info className="text-purple-400 mb-2" size={28} />
            <h3 className="font-semibold text-lg text-white">🎓 Student Friendly</h3>
            <p className="text-gray-400 text-sm">
              Designed to make earthquake science approachable, with visuals instead of
              complex jargon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

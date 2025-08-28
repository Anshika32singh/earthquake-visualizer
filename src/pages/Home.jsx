import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Clock, Info, Globe } from "lucide-react";

export default function Home() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedEq, setSelectedEq] = useState(null);
  const [feed, setFeed] = useState("all_day");

  const feeds = {
    all_hour: "Past Hour",
    all_day: "Past Day",
    all_week: "Past 7 Days",
    all_month: "Past 30 Days",
  };

  useEffect(() => {
    fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}.geojson`
    )
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features));
  }, [feed]);

  const getMagnitudeColor = (mag) => {
    if (mag < 3) return "bg-green-500/80 text-green-100";
    if (mag < 5) return "bg-yellow-500/80 text-yellow-100";
    return "bg-red-600/80 text-red-100";
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-950 text-gray-100">
      {/* Horizontal Navbar */}
      <nav className="flex items-center justify-between bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-400 animate-spin-slow" />
          <h1 className="text-lg font-semibold tracking-wide">QuakeTracker</h1>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {Object.entries(feeds).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFeed(key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-all shadow ${
                feed === key
                  ? "bg-blue-600 text-white shadow-blue-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Clock className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 bg-gray-900/70 backdrop-blur-xl flex flex-col overflow-y-auto p-4 border-r border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="flex items-center gap-2 bg-gray-800/60 px-4 py-2 rounded-xl shadow-inner mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search location..."
              className="bg-transparent outline-none flex-1 text-sm placeholder-gray-400 text-white"
            />
          </div>

          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-300 mb-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            Live Earthquakes
          </h2>

          <div className="flex flex-col gap-2">
            {earthquakes.slice(0, 50).map((eq) => {
              const mag = eq.properties.mag;
              return (
                <div
                  key={eq.id}
                  onClick={() =>
                    setSelectedEq([
                      eq.geometry.coordinates[1],
                      eq.geometry.coordinates[0],
                    ])
                  }
                  className="p-4 rounded-2xl bg-gray-800/60 hover:bg-gray-700 transition transform hover:scale-[1.02] cursor-pointer shadow-lg border border-gray-700/50"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium line-clamp-1">
                      {eq.properties.place}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-bold shadow ${getMagnitudeColor(
                        mag
                      )}`}
                    >
                      M {mag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(eq.properties.time).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-auto p-4 border-t border-gray-800 text-sm text-gray-400">
            <div className="flex items-center gap-2 font-semibold text-gray-300 mb-1">
              <Info className="w-4 h-4 text-gray-400" />
              About
            </div>
            Data from <span className="text-blue-400">USGS</span> • Updated live
          </div>
        </aside>

        {/* Right Map */}
        <main className="flex-1 relative">
          <MapContainer
            center={selectedEq || [20, 0]}
            zoom={selectedEq ? 5 : 2}
            style={{ height: "100%", width: "100%" }}
            key={selectedEq}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {earthquakes.map((eq) => (
              <CircleMarker
                key={eq.id}
                center={[
                  eq.geometry.coordinates[1],
                  eq.geometry.coordinates[0],
                ]}
                radius={Math.max(eq.properties.mag * 2, 4)}
                color="red"
                fillOpacity={0.8}
                className="transition-transform duration-500 hover:scale-110"
              >
                <Popup>
                  <div className="space-y-1">
                    <strong className="text-sm">{eq.properties.place}</strong>
                    <div className="text-xs">
                      Magnitude:{" "}
                      <span className="font-semibold text-red-500">
                        {eq.properties.mag}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(eq.properties.time).toLocaleString()}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import About from "./pages/About";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen w-screen bg-gray-950 text-gray-100">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-6 h-12 flex items-center justify-between shadow">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold text-base animate-pulse">⛰️</span>
            <h1 className="text-base font-semibold tracking-wide text-white">
              QuakeTracker
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-5">
            {["/", "/stats", "/about"].map((path, idx) => {
              const labels = ["Home", "Stats", "About"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative px-2 py-1 text-sm font-medium transition duration-200 ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col bg-gray-900/95 border-b border-gray-800 shadow animate-slideDown">
            {["/", "/stats", "/about"].map((path, idx) => {
              const labels = ["Home", "Stats", "About"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 text-gray-300 hover:bg-gray-800 hover:text-white text-sm transition"
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Pages */}
        <div className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

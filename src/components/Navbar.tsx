"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navLinks = [
     { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="group">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Portfolio
          </h1>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
  key={link.id}
  href={link.href}
  onClick={() => setActive(link.id)}
  className={`relative pb-1 transition duration-300 font-medium ${
    active === link.id
      ? "text-cyan-400"
      : "text-white hover:text-cyan-400"
  }`}
>
  {link.name}

  {active === link.id && (
    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-cyan-400 rounded-full" />
  )}
</a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/contact"
          className="hidden md:block px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10">
          <nav className="flex flex-col items-center py-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-cyan-400 transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
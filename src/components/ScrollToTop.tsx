"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () =>
      window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-12
        h-12
        rounded-full
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        shadow-lg
        hover:scale-110
        transition-all
        duration-300
      "
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
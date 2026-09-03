import React from "react";

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.868 2.896 2.896 0 0 1-2.892-2.892 2.896 2.896 0 0 1 2.892-2.89 2.85 2.85 0 0 1 1.05.201V9.458a6.33 6.33 0 0 0-1.05-.09A6.338 6.338 0 0 0 3.15 15.707 6.338 6.338 0 0 0 9.488 22a6.338 6.338 0 0 0 6.338-6.293V9.412a8.16 8.16 0 0 0 4.763 1.527V7.494a4.832 4.832 0 0 1-1.000-.808z" />
  </svg>
);

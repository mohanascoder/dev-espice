"use client";

import React, { useState } from "react";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-dvh w-dvw flex-col md:flex-row">
      {/* Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 bg-amber-500 text-white"
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-amber-400 p-4 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-1/5`}
      >
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
        {/* Add sidebar content here */}
      </div>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-blue-300 p-4 md:w-4/5 md:ml-0">{children}</div>
    </div>
  );
};

export default SideBar;

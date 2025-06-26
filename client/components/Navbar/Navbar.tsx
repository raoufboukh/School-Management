import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <header className="bg-white  px-6 py-4 grow">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="relative flex-1 max-w-md">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students, teachers, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                         transition-all duration-200 text-sm"
            aria-label="Search"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <button
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                                         rounded-lg transition-colors duration-200"
            aria-label="Notifications"
          >
            <IoIosNotifications className="w-6 h-6" />
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome Back!</p>
              <p className="text-xs text-gray-500">{formatDate()}</p>
            </div>
            <button className="flex-shrink-0">
              <Image
                src="/assets/avatar.png"
                alt="User profile"
                width={40}
                height={40}
                className="rounded-full ring-2 ring-gray-200 hover:ring-blue-300 
                                                 transition-all duration-200"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";

const TabSwitch = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-2">
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id
                    ? "bg-white bg-opacity-30 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;

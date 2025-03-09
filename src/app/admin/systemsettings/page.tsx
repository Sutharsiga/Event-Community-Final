"use client";
import { useState } from "react";

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    registrationOpen: true,
    eventCategories: ["Music", "Tech", "Sports"],
  });

  const [adminRoles, setAdminRoles] = useState<Record<string, boolean>>({
    manageUsers: true,
    approveEvents: false,
    editSettings: true,
  });

  // Toggle Boolean Settings
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle Admin Permissions
  const toggleRole = (role: string) => {
    setAdminRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">System Settings</h1>

        {/* Registration Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Registration Settings</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.registrationOpen}
              onChange={() => toggleSetting("registrationOpen")}
              className="w-5 h-5"
            />
            <span>Allow New User Registrations</span>
          </label>
        </div>

        {/* Event Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Event Categories</h2>
          <ul className="list-disc pl-5 space-y-1">
            {settings.eventCategories.map((category, index) => (
              <li key={index} className="text-gray-700">
                {category}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add Category..."
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        {/* Admin Permissions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Admin Permissions</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(adminRoles).map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={adminRoles[role]}
                  onChange={() => toggleRole(role)}
                  className="w-5 h-5"
                />
                <span className="capitalize">
                  {role.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-end justify-end ">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Changes
        </button>
        </div>
        
      </div>
    </>
  );
}

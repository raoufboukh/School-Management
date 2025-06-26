"use client";

import Account from "@/components/Settings/Account/Account";
import Password from "@/components/Settings/Password/Password";
import { updateProfile } from "@/redux/slices/AuthSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSchool,
  MdSave,
  MdEdit,
  MdCamera,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    number: user?.number || "",
    fields: user?.fields || "",
    role: user?.role || "student",
    profilePicture: user?.profilePicture || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(updateProfile(formData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldColor = (field: string) => {
    switch (field) {
      case "PRIMARY":
        return "bg-green-100 text-green-800";
      case "CEM":
        return "bg-blue-100 text-blue-800";
      case "LICEE":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "teacher":
        return "bg-green-100 text-green-800";
      case "student":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MdPerson className="text-primary" />
                  Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <MdEdit className="text-sm" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    {formData.profilePicture ? (
                      <img
                        src={formData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      formData.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <MdCamera className="text-sm" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {formData.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        formData.role
                      )}`}
                    >
                      {formData.role.charAt(0).toUpperCase() +
                        formData.role.slice(1)}
                    </span>
                    {formData.fields && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(
                          formData.fields
                        )}`}
                      >
                        {formData.fields}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="number"
                      value={formData.number || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+213555123456"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {formData.role === "student" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Educational Level
                    </label>
                    <div className="relative">
                      <MdSchool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="fields"
                        value={formData.fields || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select Level</option>
                        <option value="PRIMARY">Primary</option>
                        <option value="CEM">CEM</option>
                        <option value="LICEE">Lycée</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <MdSave />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setFormData(user);
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <Password setIsLoading={setIsLoading} isLoading={isLoading} />
          </div>
          <Account user={user} />
        </div>
      </div>
    </div>
  );
};

export default Settings;

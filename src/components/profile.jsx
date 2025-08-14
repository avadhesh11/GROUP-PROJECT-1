import React from "react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        
        {/* Profile Image */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Name & Bio */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">John Doe</h2>
        <p className="text-gray-500 text-sm">@johndoe</p>
        <p className="mt-2 text-gray-600">
          Passionate web developer & designer. Love building user-friendly
          digital experiences.
        </p>

        {/* Stats */}
        <div className="flex justify-around mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">120</h3>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">5.2k</h3>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">480</h3>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

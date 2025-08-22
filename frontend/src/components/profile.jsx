import React from "react";

export default function Profile() {
 const user = {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop",
    weddingsPlanned: 12,
    upcomingEvents: 3,
    bio: "Passionate wedding planner helping couples create unforgettable moments.",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
  
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
      
        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-pink-300 object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.bio}</p>
        </div>


        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600">{user.location}</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Weddings Planned</h3>
            <p className="text-gray-600">{user.weddingsPlanned}</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Upcoming Events</h3>
            <p className="text-gray-600">{user.upcomingEvents}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-5 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">
            Edit Profile
          </button>
          <button className="px-5 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

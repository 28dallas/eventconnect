import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name}!
                </h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Profile</h3>
                  <p className="text-blue-700">Complete your profile to get more bookings</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    Edit Profile
                  </button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Bookings</h3>
                  <p className="text-green-700">Manage your upcoming events</p>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm">
                    View Bookings
                  </button>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Messages</h3>
                  <p className="text-purple-700">Connect with clients</p>
                  <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded text-sm">
                    View Messages
                  </button>
                </div>
              </div>

              {user?.userType === 'professional' && (
                <div className="bg-white border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Professional Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded p-4">
                      <h3 className="font-semibold mb-2">Portfolio</h3>
                      <p className="text-gray-600 text-sm mb-3">Showcase your best work</p>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        Manage Portfolio
                      </button>
                    </div>
                    <div className="border rounded p-4">
                      <h3 className="font-semibold mb-2">Availability</h3>
                      <p className="text-gray-600 text-sm mb-3">Set your available dates</p>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        Update Calendar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {user?.userType === 'client' && (
                <div className="bg-white border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Client Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded p-4">
                      <h3 className="font-semibold mb-2">Find Professionals</h3>
                      <p className="text-gray-600 text-sm mb-3">Browse and book event services</p>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        Browse Now
                      </button>
                    </div>
                    <div className="border rounded p-4">
                      <h3 className="font-semibold mb-2">My Events</h3>
                      <p className="text-gray-600 text-sm mb-3">Track your upcoming events</p>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        View Events
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
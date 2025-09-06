import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    services: user?.services || [],
    portfolio: user?.portfolio || []
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const addPortfolioItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      category: ''
    };
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, newItem]
    });
  };

  const updatePortfolioItem = (id, field, value) => {
    setFormData({
      ...formData,
      portfolio: formData.portfolio.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const removePortfolioItem = (id) => {
    setFormData({
      ...formData,
      portfolio: formData.portfolio.filter(item => item.id !== id)
    });
  };

  return (
    <div className="min-h-screen section-bg py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-blue-100 capitalize">{user?.userType}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                placeholder="Tell clients about yourself and your services..."
              />
            </div>

            {/* Portfolio Section */}
            {user?.userType === 'professional' && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Portfolio</h2>
                  {isEditing && (
                    <button
                      onClick={addPortfolioItem}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add Project
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.portfolio.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                            placeholder="Project title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <textarea
                            value={item.description}
                            onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)}
                            placeholder="Project description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows={3}
                          />
                          <button
                            onClick={() => removePortfolioItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove Project
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title || 'Untitled Project'}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.description || 'No description'}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {formData.portfolio.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No portfolio items yet. Add your first project to showcase your work!</p>
                  </div>
                )}
              </div>
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
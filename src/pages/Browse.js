import React, { useState } from 'react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'photography', name: 'Photography' },
    { id: 'planning', name: 'Event Planning' },
    { id: 'catering', name: 'Catering' },
    { id: 'music', name: 'Music & DJ' },
    { id: 'decoration', name: 'Decoration' },
    { id: 'venue', name: 'Venues' }
  ];

  const professionals = [
    {
      id: 1,
      name: 'Sarah Johnson',
      category: 'photography',
      rating: 4.9,
      reviews: 127,
      price: '$150/hour',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      category: 'planning',
      rating: 4.8,
      reviews: 89,
      price: '$200/event',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      category: 'catering',
      rating: 4.7,
      reviews: 156,
      price: '$25/person',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesCategory = selectedCategory === 'all' || prof.category === selectedCategory;
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Professionals</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map(professional => (
            <div key={professional.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {professional.name}
                </h3>
                <p className="text-gray-600 mb-2 capitalize">{professional.category}</p>
                <p className="text-gray-600 mb-3">{professional.location}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {professional.rating} ({professional.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {professional.price}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No professionals found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
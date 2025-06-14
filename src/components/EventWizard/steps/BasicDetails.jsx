import { useState } from 'react';
import { FileText, Tag } from 'lucide-react';

const BasicDetails = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    title: data.title || '',
    description: data.description || '',
    category: data.category || ''
  });

  const categories = [
    'Conference',
    'Workshop',
    'Networking',
    'Social',
    'Sports',
    'Entertainment',
    'Education',
    'Business',
    'Technology',
    'Arts & Culture',
    'Food & Drink',
    'Health & Wellness'
  ];

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Details</h2>
        <p className="text-gray-600">
          Let's start with the basics. What's your event about?
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your event title..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Choose a clear, descriptive title that tells people what your event is about
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={6}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your event in detail..."
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Include important details like agenda, speakers, what to expect, etc.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Tips for a great event page</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a clear, compelling title that describes your event</li>
            <li>• Write a detailed description that answers: What? When? Where? Why?</li>
            <li>• Choose the most relevant category to help people find your event</li>
            <li>• Include any special requirements or what attendees should bring</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
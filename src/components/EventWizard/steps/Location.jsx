import { useState } from 'react';
import { MapPin, Globe, Building, Link } from 'lucide-react';

const Location = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    type: data.location?.type || 'physical',
    address: data.location?.address || '',
    venue: data.location?.venue || '',
    onlineLink: data.location?.onlineLink || '',
    instructions: data.location?.instructions || ''
  });

  const handleChange = (field, value) => {
    const newData = { 
      ...formData, 
      [field]: value 
    };
    setFormData(newData);
    updateData({ location: newData });
  };

  const handleTypeChange = (type) => {
    const newData = { ...formData, type };
    setFormData(newData);
    updateData({ location: newData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where is your event?</h2>
        <p className="text-gray-600">
          Choose whether your event is in-person, online, or hybrid
        </p>
      </div>

      <div className="space-y-6">
        {/* Location Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => handleTypeChange('physical')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.type === 'physical'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MapPin className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">In Person</h3>
              <p className="text-sm text-gray-600">Physical venue or location</p>
            </button>

            <button
              type="button"
              onClick={() => handleTypeChange('online')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.type === 'online'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Globe className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Online</h3>
              <p className="text-sm text-gray-600">Virtual event with link</p>
            </button>

            <button
              type="button"
              onClick={() => handleTypeChange('hybrid')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.type === 'hybrid'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Hybrid</h3>
              <p className="text-sm text-gray-600">Both in-person and online</p>
            </button>
          </div>
        </div>

        {/* Physical Location */}
        {(formData.type === 'physical' || formData.type === 'hybrid') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleChange('venue', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Conference Center, My Office, Central Park"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter complete address with city, state, and zip"
                  required={formData.type === 'physical' || formData.type === 'hybrid'}
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will appear here</p>
              <p className="text-sm text-gray-500 mt-2">
                Google Maps integration for location selection
              </p>
            </div>
          </div>
        )}

        {/* Online Location */}
        {(formData.type === 'online' || formData.type === 'hybrid') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Online Meeting Link
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={formData.onlineLink}
                onChange={(e) => handleChange('onlineLink', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://zoom.us/j/123456789 or meeting platform URL"
                required={formData.type === 'online' || formData.type === 'hybrid'}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This will be shared with attendees when they RSVP
            </p>
          </div>
        )}

        {/* Additional Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Instructions
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Parking info, entrance details, what to bring, etc."
          />
        </div>

        {/* Location Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-2">📍 Location Tips</h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Include parking information and public transit options</li>
            <li>• Mention any accessibility features or requirements</li>
            <li>• For online events, test your meeting link beforehand</li>
            <li>• Consider time zones for virtual events with remote attendees</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Location;
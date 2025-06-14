import { useState } from 'react';
import { Users, Shield, DollarSign, Settings } from 'lucide-react';

const Attendees = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    capacity: data.capacity || '',
    ticketType: data.ticketType || 'free',
    ticketPrice: data.ticketPrice || '',
    privacy: data.privacy || 'public',
    allowGuests: data.allowGuests || true,
    requireApproval: data.requireApproval || false,
    ageRestriction: data.ageRestriction || 'none',
    guestLimit: data.guestLimit || 1
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendee Settings</h2>
        <p className="text-gray-600">
          Configure who can attend and how they can join your event
        </p>
      </div>

      <div className="space-y-6">
        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Capacity
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Maximum number of attendees"
              min="1"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Leave empty for unlimited capacity
          </p>
        </div>

        {/* Privacy Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Privacy *
          </label>
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={formData.privacy === 'public'}
                onChange={(e) => handleChange('privacy', e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">Public Event</div>
                <div className="text-sm text-gray-600">
                  Anyone can find and join this event
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={formData.privacy === 'private'}
                onChange={(e) => handleChange('privacy', e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">Private Event</div>
                <div className="text-sm text-gray-600">
                  Only people you invite can join
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="privacy"
                value="invite-only"
                checked={formData.privacy === 'invite-only'}
                onChange={(e) => handleChange('privacy', e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">Invite Only</div>
                <div className="text-sm text-gray-600">
                  People can find it but need approval to join
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Ticket Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ticket Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange('ticketType', 'free')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.ticketType === 'free'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Free Event</h3>
              <p className="text-sm text-gray-600">No charge for attendance</p>
            </button>

            <button
              type="button"
              onClick={() => handleChange('ticketType', 'paid')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.ticketType === 'paid'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Paid Event</h3>
              <p className="text-sm text-gray-600">Charge for tickets</p>
            </button>
          </div>
        </div>

        {/* Ticket Price */}
        {formData.ticketType === 'paid' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={formData.ticketPrice}
                onChange={(e) => handleChange('ticketPrice', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
                required={formData.ticketType === 'paid'}
              />
            </div>
          </div>
        )}

        {/* Additional Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Additional Settings
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Allow Guests</div>
                <div className="text-sm text-gray-600">
                  Let attendees bring additional guests
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.allowGuests}
                onChange={(e) => handleChange('allowGuests', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>

            {formData.allowGuests && (
              <div className="ml-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum guests per attendee
                </label>
                <select
                  value={formData.guestLimit}
                  onChange={(e) => handleChange('guestLimit', parseInt(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            )}

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Require Approval</div>
                <div className="text-sm text-gray-600">
                  Manually approve each attendee
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.requireApproval}
                onChange={(e) => handleChange('requireApproval', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 mb-2">🎫 Attendance Tips</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Set realistic capacity limits based on your venue</li>
            <li>• Consider having a waitlist for popular events</li>
            <li>• Free events typically have higher no-show rates</li>
            <li>• Paid events usually have better attendance commitment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
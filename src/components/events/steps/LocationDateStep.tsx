import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { EventFormData } from '../../../types';

interface LocationDateStepProps {
  formData: EventFormData;
  onChange: (updates: Partial<EventFormData>) => void;
}

const LocationDateStep: React.FC<LocationDateStepProps> = ({ formData, onChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Date</h2>
        <p className="text-gray-600">When and where will your event take place?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Event Location *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter venue address or location"
          />
          <p className="text-xs text-gray-500 mt-1">
            Be as specific as possible to help attendees find the venue
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Event Timing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Start Date *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => onChange({ date: e.target.value })}
                min={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => onChange({ time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="hasEndTime"
                checked={!!(formData.endDate || formData.endTime)}
                onChange={(e) => {
                  if (!e.target.checked) {
                    onChange({ endDate: '', endTime: '' });
                  } else {
                    onChange({ endDate: formData.date, endTime: '' });
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasEndTime" className="ml-2 text-sm font-medium text-gray-700">
                Set end date and time
              </label>
            </div>

            {(formData.endDate || formData.endTime) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => onChange({ endDate: e.target.value })}
                    min={formData.date || today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={formData.endTime}
                    onChange={(e) => onChange({ endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Pro Tip</h4>
          <p className="text-sm text-blue-800">
            Consider your audience's schedule when choosing dates and times. Weekends work well for social events, 
            while weekday evenings are great for professional networking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationDateStep;
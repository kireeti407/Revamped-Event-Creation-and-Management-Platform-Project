import React from 'react';
import { Calendar, MapPin, Users, MoreVertical } from 'lucide-react';
import { Event } from '../../types';
import { formatEventDate, formatEventTime, getTimeUntilEvent } from '../../utils/dateUtils';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  onRSVP?: (eventId: string, status: 'attending' | 'maybe' | 'not-attending') => void;
  currentUserId?: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onEdit, 
  onDelete, 
  onRSVP, 
  currentUserId 
}) => {
  const attendingCount = event.rsvps.filter(rsvp => rsvp.status === 'attending').length;
  const currentUserRsvp = currentUserId 
    ? event.rsvps.find(rsvp => rsvp.userId === currentUserId)
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending': return 'bg-green-100 text-green-800';
      case 'maybe': return 'bg-yellow-100 text-yellow-800';
      case 'not-attending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {event.bannerImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
          </div>
          
          {onEdit && onDelete && (
            <div className="relative ml-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>{formatEventDate(event.date)} at {formatEventTime(event.date)}</span>
            <span className="ml-auto text-xs text-blue-600 font-medium">
              {getTimeUntilEvent(event.date)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-green-500" />
            <span>{attendingCount} attending</span>
            {event.maxAttendees && (
              <span className="text-gray-400"> / {event.maxAttendees} max</span>
            )}
          </div>
        </div>

        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {onRSVP && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            {currentUserRsvp ? (
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentUserRsvp.status)}`}>
                  {currentUserRsvp.status === 'attending' && 'You\'re attending'}
                  {currentUserRsvp.status === 'maybe' && 'You might attend'}
                  {currentUserRsvp.status === 'not-attending' && 'You\'re not attending'}
                </span>
                <button 
                  onClick={() => onRSVP(event.id,'not-attending')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => onRSVP(event.id, 'attending')}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  Attending
                </button>
                <button
                  onClick={() => onRSVP(event.id, 'maybe')}
                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium"
                >
                  Maybe
                </button>
                <button
                  onClick={() => onRSVP(event.id, 'not-attending')}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                >
                  Can't go
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Globe, 
  DollarSign,
  Shield,
  Edit3
} from 'lucide-react';

const Review = ({ data, updateData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getLocationDisplay = () => {
    const { location } = data;
    if (!location) return 'Not set';
    
    switch (location.type) {
      case 'physical':
        return location.venue || location.address || 'Physical location';
      case 'online':
        return 'Online event';
      case 'hybrid':
        return 'Hybrid (In-person & Online)';
      default:
        return 'Not set';
    }
  };

  const ReviewSection = ({ title, children, icon: Icon }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
          <Edit3 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Event</h2>
        <p className="text-gray-600">
          Check all the details before publishing your event
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Banner */}
        {data.banner && (
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={data.banner.preview}
              alt="Event banner"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Basic Details */}
        <ReviewSection title="Event Details" icon={Tag}>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 text-xl">{data.title || 'Untitled Event'}</h4>
              <p className="text-sm text-gray-600 mt-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {data.category || 'Uncategorized'}
                </span>
              </p>
            </div>
            {data.description && (
              <div>
                <p className="text-gray-700 leading-relaxed">{data.description}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Date & Time */}
        <ReviewSection title="Date & Time" icon={Calendar}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {formatDate(data.date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {formatTime(data.time)}
                {data.endTime && ` - ${formatTime(data.endTime)}`}
              </span>
            </div>
            {data.timezone && (
              <p className="text-sm text-gray-600">
                Timezone: {data.timezone.replace('_', ' ')}
              </p>
            )}
          </div>
        </ReviewSection>

        {/* Location */}
        <ReviewSection title="Location" icon={MapPin}>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-900">{getLocationDisplay()}</p>
                {data.location?.address && (
                  <p className="text-sm text-gray-600 mt-1">{data.location.address}</p>
                )}
                {data.location?.onlineLink && (
                  <p className="text-sm text-blue-600 mt-1">
                    Meeting link will be provided to attendees
                  </p>
                )}
              </div>
            </div>
            {data.location?.instructions && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{data.location.instructions}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Attendee Settings */}
        <ReviewSection title="Attendee Settings" icon={Users}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {data.capacity ? `Max ${data.capacity} attendees` : 'Unlimited capacity'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 capitalize">{data.privacy} event</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {data.ticketType === 'free' 
                  ? 'Free event' 
                  : `$${data.ticketPrice} per ticket`
                }
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.allowGuests && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Guests allowed
                </span>
              )}
              {data.requireApproval && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                  Approval required
                </span>
              )}
            </div>
          </div>
        </ReviewSection>

        {/* Media */}
        {data.images && data.images.length > 0 && (
          <ReviewSection title="Event Images" icon={Globe}>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {data.images.slice(0, 5).map((image, index) => (
                <div key={image.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.preview}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {data.images.length > 5 && (
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    +{data.images.length - 5} more
                  </span>
                </div>
              )}
            </div>
          </ReviewSection>
        )}

        {/* Publish Options */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ready to publish?</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                defaultChecked
              />
              <span className="text-sm text-gray-700">
                Send notifications to my followers
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                defaultChecked
              />
              <span className="text-sm text-gray-700">
                Allow search engines to index this event
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Share on social media automatically
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Calendar, 
  Plus, 
  Users, 
  Clock, 
  MapPin, 
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
    thisMonthEvents: 0
  });

  // Mock data - replace with Firebase data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Tech Conference 2024',
        date: '2024-02-15',
        time: '09:00',
        location: 'San Francisco, CA',
        attendees: 156,
        maxAttendees: 200,
        status: 'upcoming',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'Design Workshop',
        date: '2024-02-20',
        time: '14:00',
        location: 'New York, NY',
        attendees: 45,
        maxAttendees: 50,
        status: 'upcoming',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 3,
        title: 'Networking Mixer',
        date: '2024-01-28',
        time: '18:00',
        location: 'Austin, TX',
        attendees: 89,
        maxAttendees: 100,
        status: 'past',
        image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];

    setEvents(mockEvents);
    setStats({
      totalEvents: mockEvents.length,
      upcomingEvents: mockEvents.filter(e => e.status === 'upcoming').length,
      totalAttendees: mockEvents.reduce((sum, e) => sum + e.attendees, 0),
      thisMonthEvents: mockEvents.filter(e => e.date.includes('2024-02')).length
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{trend}% this month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.status === 'upcoming' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees} / {event.maxAttendees} attendees
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
            />
          </div>
          <Link
            to={`/events/${event.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.displayName || user?.email}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your events
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend={12}
          />
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={Clock}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend={8}
          />
          <StatCard
            title="Total Attendees"
            value={stats.totalAttendees}
            icon={Users}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend={15}
          />
          <StatCard
            title="This Month"
            value={stats.thisMonthEvents}
            icon={TrendingUp}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
            trend={5}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/create-event"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Event</span>
            </Link>
            <Link
              to="/my-events"
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Manage Events</span>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first event</p>
              <Link
                to="/create-event"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Create Event</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
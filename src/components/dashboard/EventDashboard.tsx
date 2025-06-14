import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import EventCard from './EventCard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const EventDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'my-events' | 'attending' | 'upcoming'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { currentUser } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterType]);

  const loadEvents = async () => {
    try {
      const eventsData = await eventService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    switch (filterType) {
      case 'my-events':
        filtered = filtered.filter(event => event.createdBy === currentUser?.id);
        break;
      case 'attending':
        filtered = filtered.filter(event =>
          event.rsvps.some(rsvp => rsvp.userId === currentUser?.id && rsvp.status === 'attending')
        );
        break;
      case 'upcoming':
        filtered = filtered.filter(event => new Date(event.date) > new Date());
        break;
      default:
        break;
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredEvents(filtered);
  };

  const handleRSVP = async (eventId: string, status: 'attending' | 'maybe' | 'not-attending') => {
    if (!currentUser) return;

    try {
      const rsvp = {
        userId: currentUser.id,
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
        status,
      };

      await eventService.updateRSVP(eventId, rsvp);
      await loadEvents(); // Reload to get updated RSVP data
      toast.success('RSVP updated successfully');
    } catch (error) {
      toast.error('Failed to update RSVP');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events Dashboard</h1>
            <p className="text-gray-600 mt-1">Discover and manage your events</p>
          </div>
          
          <Link
            to="/create-event"
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Events</option>
                <option value="my-events">My Events</option>
                <option value="attending">Attending</option>
                <option value="upcoming">Upcoming</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first event to get started'
              }
            </p>
            {!searchTerm && filterType === 'all' && (
              <Link
                to="/create-event"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Create Your First Event</span>
              </Link>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                currentUserId={currentUser?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
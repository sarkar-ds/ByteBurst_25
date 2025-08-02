import React, { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, User } from 'lucide-react';
import { formalEvents, informalEvents } from '../data/events';
import { useAuth } from '../contexts/AuthContext';

export default function Events({ onAuthClick }) {
  const [activeTab, setActiveTab] = useState('formal');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();

  const currentEvents = activeTab === 'formal' ? formalEvents : informalEvents;

  const handleRegister = (event) => {
    if (!user) {
      onAuthClick();
      return;
    }
    // Mock registration logic
    alert(`Successfully registered for ${event.name}!`);
  };

  const EventCard = ({ event }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
        <div className="flex items-center space-x-2">
          {event.isTeamEvent && (
            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
              Team Event
            </span>
          )}
          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
            {event.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {event.venue}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="w-4 h-4 mr-2" />
          {event.currentParticipants}/{event.maxParticipants} registered
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Trophy className="w-4 h-4 mr-2" />
          Prize: {event.prizes[0]}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setSelectedEvent(event)}
          className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => handleRegister(event)}
          className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-500/25"
        >
          Register
        </button>
      </div>
    </div>
  );

  const EventModal = ({ event, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{event.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300">{event.description}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-medium">Date & Time</div>
                  <div className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                <div>
                  <div className="font-medium">Venue</div>
                  <div className="text-sm text-gray-400">{event.venue}</div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-3 text-green-400" />
                <div>
                  <div className="font-medium">Participants</div>
                  <div className="text-sm text-gray-400">
                    {event.currentParticipants}/{event.maxParticipants} registered
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-medium">Registration Deadline</div>
                  <div className="text-sm text-gray-400">
                    {new Date(event.registrationDeadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-300">
                <User className="w-5 h-5 mr-3 text-indigo-400" />
                <div>
                  <div className="font-medium">Event Type</div>
                  <div className="text-sm text-gray-400">
                    {event.isTeamEvent ? `Team (${event.teamSize} members)` : 'Individual'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Trophy className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-medium">Prizes</div>
                  <div className="text-sm text-gray-400">
                    {event.prizes.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Rules & Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {event.rules.map((rule, index) => (
                <li key={index} className="text-sm">{rule}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Event Coordinator</h3>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="font-medium text-white">{event.coordinator.name}</div>
              <div className="text-sm text-gray-400">{event.coordinator.contact}</div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Close
            </button>
            <button
              onClick={() => handleRegister(event)}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-500/25"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Our Events
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our exciting lineup of formal and informal tech events. 
            Challenge yourself, showcase your skills, and win amazing prizes!
          </p>
        </div>

        {/* Event Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
            <button
              onClick={() => setActiveTab('formal')}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'formal'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Formal Events
            </button>
            <button
              onClick={() => setActiveTab('informal')}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'informal'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Informal Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </section>
  );
} 
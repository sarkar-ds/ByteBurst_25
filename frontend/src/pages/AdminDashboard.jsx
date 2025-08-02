import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Phone, 
  Info, 
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Tech Fest 2024',
    date: '2024-03-15',
    time: '10:00 AM',
    location: 'Main Auditorium',
    description: 'Annual technical festival with coding competitions',
    registeredStudents: [
      { id: 1, name: 'John Doe', rollNo: '2021CSE001', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', rollNo: '2021CSE002', email: 'jane@example.com' }
    ]
  },
  {
    id: 2,
    title: 'Hackathon 2024',
    date: '2024-03-20',
    time: '9:00 AM',
    location: 'Computer Lab',
    description: '24-hour coding challenge',
    registeredStudents: [
      { id: 3, name: 'Mike Johnson', rollNo: '2021CSE003', email: 'mike@example.com' }
    ]
  }
];

// Mock data for team members
const mockTeam = [
  { id: 1, name: 'Dr. John Smith', role: 'Faculty Advisor', image: '/placeholder.jpg' },
  { id: 2, name: 'Sarah Wilson', role: 'Event Coordinator', image: '/placeholder.jpg' }
];

// Mock data for about section
const mockAbout = {
  title: 'About Tchnokratos',
  description: 'Tchnokratos is the technical society of MMMUT, dedicated to fostering innovation and technical excellence among students.'
};

// Mock data for contact section
const mockContact = {
  email: 'tchnokratos@mmmut.ac.in',
  phone: '+91-1234567890',
  address: 'MMMUT, Gorakhpur, Uttar Pradesh'
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [events, setEvents] = useState(mockEvents);
  const [team, setTeam] = useState(mockTeam);
  const [about, setAbout] = useState(mockAbout);
  const [contact, setContact] = useState(mockContact);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Manage Events', icon: Calendar },
    { id: 'about', label: 'Manage About', icon: Info },
    { id: 'team', label: 'Manage Team', icon: Users },
    { id: 'contact', label: 'Manage Contact', icon: Phone },
    { id: 'students', label: 'Registered Students', icon: UserCheck }
  ];

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      id: Date.now(),
      ...newEvent,
      registeredStudents: []
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.reduce((total, event) => total + event.registeredStudents.length, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">{team.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admin</p>
              <p className="text-2xl font-bold text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Events</h3>
        <div className="space-y-3">
          {events.slice(0, 3).map(event => (
            <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
              </div>
              <span className="text-sm text-blue-600">{event.registeredStudents.length} registrations</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      
      {/* Add Event Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Event</h3>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </button>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Events</h3>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    {event.registeredStudents.length} students registered
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => setAbout({...about, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={about.description}
              onChange={(e) => setAbout({...about, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {team.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({...contact, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact({...contact, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={contact.address}
              onChange={(e) => setContact({...contact, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="space-y-6">
        {events.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{event.title}</h3>
            {event.registeredStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {event.registeredStudents.map(student => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No students registered for this event</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'events':
        return renderEvents();
      case 'about':
        return renderAbout();
      case 'team':
        return renderTeam();
      case 'contact':
        return renderContact();
      case 'students':
        return renderStudents();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-800 text-white rounded-md shadow-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 transition-all duration-300 ease-in-out">
        {/* Admin Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 lg:pt-0 pt-16">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'dashboard' && 'Dashboard'}
                  {activeSection === 'events' && 'Manage Events'}
                  {activeSection === 'about' && 'Manage About'}
                  {activeSection === 'team' && 'Manage Team'}
                  {activeSection === 'contact' && 'Manage Contact'}
                  {activeSection === 'students' && 'Registered Students'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeSection === 'dashboard' && 'Overview of your event management system'}
                  {activeSection === 'events' && 'Add, edit, and manage events'}
                  {activeSection === 'about' && 'Update about section content'}
                  {activeSection === 'team' && 'Manage team members'}
                  {activeSection === 'contact' && 'Update contact information'}
                  {activeSection === 'students' && 'View student registrations by event'}
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                <span>Welcome,</span>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 
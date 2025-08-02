import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty Coordinator',
      department: 'Computer Science & Engineering',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'rajesh.kumar@mmmut.ac.in',
      phone: '+91-9876543210'
    },
    {
      name: 'Priya Sharma',
      role: 'Event Manager',
      department: 'Electronics & Communication',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'priya.sharma@student.mmmut.ac.in',
      phone: '+91-9876543211'
    },
    {
      name: 'Arjun Patel',
      role: 'Technical Head',
      department: 'Information Technology',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'arjun.patel@student.mmmut.ac.in',
      phone: '+91-9876543212'
    },
    {
      name: 'Sneha Gupta',
      role: 'Cultural Head',
      department: 'Mechanical Engineering',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'sneha.gupta@student.mmmut.ac.in',
      phone: '+91-9876543213'
    },
    {
      name: 'Rohit Singh',
      role: 'Marketing Head',
      department: 'Civil Engineering',
      image: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'rohit.singh@student.mmmut.ac.in',
      phone: '+91-9876543214'
    },
    {
      name: 'Anjali Verma',
      role: 'Finance Head',
      department: 'Electrical Engineering',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'anjali.verma@student.mmmut.ac.in',
      phone: '+91-9876543215'
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The passionate individuals behind TechnoKratos who work tirelessly 
            to make this festival a grand success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-1">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.department}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <Mail className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${member.email}`}
                    className="hover:text-blue-400 transition-colors truncate"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Phone className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
                  <a 
                    href={`tel:${member.phone}`}
                    className="hover:text-green-400 transition-colors"
                  >
                    {member.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">Connect</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-300 mb-6">
              We're always looking for passionate students who want to contribute 
              to making TechnoKratos bigger and better every year.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-500/25">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
import React from 'react';
import { Award, Users, Calendar, Target } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Calendar, label: 'Years Running', value: '15+' },
    { icon: Users, label: 'Participants', value: '500+' },
    { icon: Award, label: 'Events', value: '20+' },
    { icon: Target, label: 'Prize Pool', value: '₹1L+' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              About TechnoKratos
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Where Technology Meets Culture
            </h3>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                TechnoKratos is the flagship annual techno-cultural festival of 
                Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur. 
                For over a decade, we've been at the forefront of celebrating the 
                perfect fusion of technology and culture.
              </p>
              <p>
                Our festival brings together brilliant minds from across the country 
                to compete, collaborate, and celebrate innovation. From intense coding 
                competitions to creative cultural performances, TechnoKratos offers 
                a platform for every talent to shine.
              </p>
              <p>
                Join us as we continue to push boundaries, foster innovation, and 
                create unforgettable memories in the heart of Uttar Pradesh's 
                premier technical institution.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">
                About MMMUT Gorakhpur
              </h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Madan Mohan Malaviya University of Technology, established in 2013, 
                  is a premier technical institution in Uttar Pradesh, India.
                </p>
                <p>
                  Located in the historic city of Gorakhpur, MMMUT has rapidly 
                  emerged as a center of excellence in engineering education, 
                  research, and innovation.
                </p>
                <p>
                  The university is committed to nurturing future technologists 
                  and leaders who will drive India's technological advancement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-white mb-6">Our Mission</h4>
            <p className="text-gray-300 leading-relaxed">
              To create a dynamic platform that bridges the gap between academic 
              learning and practical application, fostering innovation, creativity, 
              and collaboration among students from diverse backgrounds.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-white mb-6">Our Vision</h4>
            <p className="text-gray-300 leading-relaxed">
              To be recognized as the premier techno-cultural festival in North India, 
              inspiring the next generation of innovators and leaders while promoting 
              technological advancement and cultural excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
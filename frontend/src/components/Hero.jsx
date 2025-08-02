import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const eventDate = new Date('2024-03-15T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                 {/* Main Title */}
         <div className="mb-8">
           <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4">
             <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent animate-pulse">
               TechnoKratos
             </span>
           </h1>
           <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6">
             Annual Techno-Cultural Festival
           </h2>
           <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
             MMMUT Gorakhpur presents the ultimate convergence of technology and culture. 
             Join us for an extraordinary celebration of innovation, creativity, and talent.
           </p>
         </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Event Dates</h3>
            <p className="text-gray-300 text-sm">March 15-17, 2024</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Venue</h3>
            <p className="text-gray-300 text-sm">MMMUT Campus, Gorakhpur</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Participants</h3>
            <p className="text-gray-300 text-sm">500+ Expected</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Prize Pool</h3>
            <p className="text-gray-300 text-sm">₹1,00,000+</p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Event Starts In</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            Explore Events
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 
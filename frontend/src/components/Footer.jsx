import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Events', href: '#events' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#' },
    { icon: Twitter, name: 'Twitter', url: '#' },
    { icon: Instagram, name: 'Instagram', url: '#' },
    { icon: Youtube, name: 'YouTube', url: '#' }
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4">
              TechnoKratos
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              The premier techno-cultural festival of MMMUT Gorakhpur, bringing together 
              innovation, creativity, and talent from across the nation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-sm">MMMUT Gorakhpur, U.P. - 273010</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-green-400" />
                <span className="text-sm">+91-551-2273491</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-purple-400" />
                <span className="text-sm">techno.kratos@mmmut.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-all duration-200 hover:scale-110 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-xs mb-3">
                Get the latest updates about TechnoKratos
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-gray-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-white placeholder-gray-400 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-w-0"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 sm:mb-0">
              © {currentYear} TechnoKratos, MMMUT Gorakhpur. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Code of Conduct
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
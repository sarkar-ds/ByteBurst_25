import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Madan Mohan Malaviya University of Technology',
        'Deoria Road, Gorakhpur',
        'Uttar Pradesh - 273010, India'
      ]
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        '+91-551-2273491',
        '+91-551-2273492',
        '+91-9876543210 (Event Helpline)'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'techno.kratos@mmmut.ac.in',
        'events@mmmut.ac.in',
        'info@mmmut.ac.in'
      ]
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 2:00 PM',
        'Sunday: Closed'
      ]
    }
  ];



  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about TechnoKratos? Need help with registration? 
            We're here to help you every step of the way.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <info.icon className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">{info.title}</h3>
              </div>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form and Location Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Location Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h3>
            <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h4 className="text-xl font-semibold text-white mb-2">MMMUT Campus, Gorakhpur</h4>
                <p className="text-gray-300 mb-2">Madan Mohan Malaviya University of Technology</p>
                <p className="text-gray-400">Deoria Road, Gorakhpur, Uttar Pradesh - 273010, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How do I register for events?",
                answer: "Simply create an account, browse our events, and click register on any event you're interested in."
              },
              {
                question: "Is there a registration fee?",
                answer: "Most events are free to participate. Some premium events may have a nominal registration fee."
              },
              {
                question: "Can I participate in multiple events?",
                answer: "Yes! You can register for as many events as you like, as long as they don't conflict with each other."
              },
              {
                question: "What if I need to cancel my registration?",
                answer: "You can cancel your registration up to 24 hours before the event starts through your dashboard."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openFaq === index 
                      ? 'max-h-32 opacity-100 pb-4' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
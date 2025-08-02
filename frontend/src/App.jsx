import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import StudentProfile from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard';

// Landing page component
function LandingPage({ onAuthClick, onSectionClick }) {
  return (
    <>
      <Header 
        onAuthClick={onAuthClick}
        onSectionClick={onSectionClick}
      />
      
      <main>
        <Hero />
        <About />
        <Events onAuthClick={onAuthClick} />
        <Team />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSectionClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            {/* Landing page route */}
            <Route 
              path="/" 
              element={
                <LandingPage 
                  onAuthClick={handleAuthClick}
                  onSectionClick={handleSectionClick}
                />
              } 
            />
            
            {/* Student profile route */}
            <Route path="/student/profile" element={<StudentProfile />} />
            
            {/* Admin dashboard route */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={handleAuthClose}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports
import LoginSignupForm from './components/LoginSignupForm';
import Home from './pages/Home'; // Import the Home component
import './App.css';
import EventPage from './pages/EventPage';
import ScrollToTop from './components/ScrollToTop';
import DishSelectionPage from './pages/DishSelectionPage';

function App() {
  return (
    <Router>
      <div className="App">
      <ScrollToTop />
        <Routes>
          {/* Route to LoginSignupForm page */}
          <Route path="/login" element={<LoginSignupForm />} />
          
          {/* Route to Home page, after login */}
          <Route path="/home" element={<Home />} />

          {/* Route to Event page, after login */}
          <Route path="/event" element={<EventPage />} />
          
          {/* Route to DishSelection page, after login */}
          <Route path="/dishselection" element={<DishSelectionPage />} />
          
          {/* Default route, which can show a redirect to login */}
          <Route path="/" element={<LoginSignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
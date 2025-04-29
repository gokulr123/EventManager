import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignupForm from './components/LoginSignupForm';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import DishSelectionPage from './pages/DishSelectionPage';
import CreateEventPage from './pages/CreateEventPage';
import Unauthorized from './pages/unauthorized'; 
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginSignupForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<LoginSignupForm />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/:eventId"
            element={
              <PrivateRoute>
                <EventPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/createevent"
            element={
              <PrivateRoute>
                <CreateEventPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dishselection"
            element={
              <PrivateRoute>
                <DishSelectionPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

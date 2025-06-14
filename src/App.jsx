import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import EventWizard from './components/EventWizard/EventWizard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Header />
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/create-event" element={
              <PrivateRoute>
                <Header />
                <EventWizard />
              </PrivateRoute>
            } />
            <Route path="/my-events" element={
              <PrivateRoute>
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
                  <p className="text-gray-600 mt-2">Manage your created events</p>
                </div>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="text-gray-600 mt-2">Manage your profile and preferences</p>
                </div>
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
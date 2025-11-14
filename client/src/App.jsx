// App.js - Updated with AOS initialization
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Citizen Pages
import CitizenLogin from './pages/citizen/CitizenLogin';
import CitizenRegister from './pages/citizen/CitizenRegister';
import CitizenDashboard from './pages/citizen/CitizenDashboard';

// Complaint Pages
import ComplaintSubmit from './pages/ComplaintSubmit';
import ComplaintConfirmation from './pages/ComplaintConfirmation';

// Authority Pages
import AuthorityLogin from './pages/authority/AuthorityLogin';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AuthorityComplaints from './pages/authority/AuthorityComplaints';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Citizen Routes */}
              <Route path="/citizen/login" element={<CitizenLogin />} />
              <Route path="/citizen/register" element={<CitizenRegister />} />
              <Route
                path="/citizen/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['citizen']}>
                    <CitizenDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Complaint Routes */}
              <Route path="/complaint/submit" element={<ComplaintSubmit />} />
              <Route path="/complaint/confirmation" element={<ComplaintConfirmation />} />

              {/* Authority Routes */}
              <Route path="/authority/login" element={<AuthorityLogin />} />
              <Route
                path="/authority/*"
                element={
                  <ProtectedRoute allowedRoles={['authority']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="dashboard" element={<AuthorityDashboard />} />
                        <Route path="complaints" element={<AuthorityComplaints />} />
                        <Route path="complaints/:id" element={<div>Complaint Detail (Coming Soon)</div>} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="complaints" element={<div>All Complaints (Coming Soon)</div>} />
                        <Route path="authorities" element={<div>Manage Authorities (Coming Soon)</div>} />
                        <Route path="upload-csv" element={<div>Upload CSV (Coming Soon)</div>} />
                        <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
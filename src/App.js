import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/AuthenticationPages/Login';
import Signup from './components/AuthenticationPages/Signup';
import Dashboard from './components/Landingpage/Dashboard';
import Home from './components/Landingpage/Home';
import About from './components/Landingpage/About';
import Contact from './components/Landingpage/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function AppLayout() {
  const location = useLocation();

  // Hide Header and Footer on dashboard page
  const hideHeaderFooter = location.pathname === '/dashboard';

  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      {!hideHeaderFooter && <Header />}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

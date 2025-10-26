import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer';
import LandingPage from './components/Landingpage/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/AuthenticationPages/Login';
import Signup from './components/AuthenticationPages/Signup';
import Dashboard from './components/Landingpage/Dashboard';


function App() {
  return (
    <>
      <Router>
        <div className="app-layout d-flex flex-column min-vh-100">
          <Header />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router></>
  );
}

export default App;

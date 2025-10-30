import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/AuthenticationPages/Login';
import Signup from './components/AuthenticationPages/Signup';
import Dashboard from './components/pages/Dashboard';
import Home from './components/Landingpage/Home';
import About from './components/Landingpage/About';
import Contact from './components/Landingpage/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import BookDetails from './components/pages/BookDetails';
import UserProfile from './components/pages/UserProfile';
import ReadingList from './components/pages/ReadingList';
import Wishlist from './components/pages/Wishlist';
import Cart from './components/pages/Cart';
import BookReader from './components/pages/BookReader';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Header and Footer */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Header />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header />
            <Contact />
            <Footer />
          </>
        } />
        
        {/* Auth Routes (no header/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/book/:id" element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        } />
        <Route path="/reader/:id" element={
          <ProtectedRoute>
            <BookReader />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/reading-list" element={
          <ProtectedRoute>
            <ReadingList />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer';
import LandingPage from './components/Landingpage/LandingPage';

function App() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
        <Header />
        <LandingPage />
        <div className="flex-grow-1">
          {/* Main content goes here */}
        </div>
        <Footer />
      </div>
  );
}

export default App;

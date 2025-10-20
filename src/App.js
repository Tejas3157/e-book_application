import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          {/* Main content goes here */}
        </div>
        <Footer />
      </div>
  );
}

export default App;

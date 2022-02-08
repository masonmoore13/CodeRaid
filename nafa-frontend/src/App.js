import './App.css';
import Navbar from './components/navbar/NavBar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// This will allow all components that are imported to use the Router.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import the pages that we will use into apps
import Home from './components/pages/home/homePage';
import About from './components/pages/about/aboutPage';
import Contact from './components/pages/contact/contactPage';
import Events from './components/pages/events/eventsPage';
import Login from './components/pages/login/loginpage'

function App() {
  return (
    <Router>
      <div className='page'>
        <Header />
        <Navbar />
        <div className="app">
          <div className="cardBox">
            <div className='content'>
              {/* only one route shows at one time */}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/events' element={<Events />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
        </div>
    </Router>
  );
}

export default App;

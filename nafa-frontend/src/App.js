
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
import UserSignup from './components/pages/user-signup/UserSignup';
import * as apiCalls from "./api/apiCalls";
import Login from './components/pages/login/login';

import CreateEvent from './components/pages/events/CreateEvent'
import EventDetail from './components/pages/events/EventDetail'
import ShowEvents from './components/pages/events/ShowEvents'
import UpdateEvent from './components/pages/events/UpdateEvent'
import EventPage from './components/pages/events/EventPage'

function App() {

  // will be changed later just for demo
  const actions = {
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login
  }

  return (
    
    <Router>
      <Header />
      <Navbar />
      <div className="app">

          <div className="content">
            {/* only one route shows at one time */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route exact path="/createEvent" component={CreateEvent} />
              <Route exact path="/eventDetail" component={EventDetail} />
              <Route exact path="/showEvents" component={ShowEvents} />
              <Route exact path="/updateEvent" component={UpdateEvent} />
              <Route path="/event" element={<EventPage />} />

              <Route path="/signup" element={<UserSignup actions={actions} />} />
              <Route path="/login" element={<Login actions={actions} />} />
            </Routes>
          </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

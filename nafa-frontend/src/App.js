
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
import UserSignup from './components/pages/user-signup/UserSignup';
import * as apiCalls from "./api/apiCalls";
import Login from './components/pages/login/login';
import AddEvent from './components/pages/events/addEvent';
import Scholarship from './components/pages/Scholarships/ScholarshipPage';
import AddScholarship from './components/pages/Scholarships/AddScholarship';
import ScholarshipDetails from './components/pages/Scholarships/ScholarshipDetails';
import ManageScholarship from './components/pages/Scholarships/ManageScholarship';

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
        <div className="cardBox">
          <div className="content">
            {/* only one route shows at one time */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/signup" element={<UserSignup actions={actions} />} />
              <Route path="/login" element={<Login actions={actions} />} />
              <Route path="/events/addevent" element={<AddEvent />} />
              <Route path="/scholarships" element={<Scholarship />} />
              <Route path="/scholarships/addscholarship" element={<AddScholarship />} />
              <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
              <Route path="/scholarships/:id/managescholarship" element={<ManageScholarship />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

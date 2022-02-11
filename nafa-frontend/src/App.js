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
import Events from './components/pages/events/events';
import UserSignup from './components/pages/user-signup/UserSignup';
import CreateEvent from './components/pages/events/createEvent';
import * as apiCalls from "./api/apiCalls";
import Login from './components/pages/login/Login';

function App() {

  // will be changed later just for demo
  const actions ={
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login
  }

  return (
    <Router>
    <Header />
    <Navbar />
    <div className="app">
   


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/signup" element={<UserSignup actions={actions}/>} />
            <Route path="/login" element={<Login actions={actions}/>} />
          </Routes> 
         



    </div>
  </Router>
  );
}

export default App;

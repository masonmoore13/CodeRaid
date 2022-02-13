import "./App.css";
import Navbar from "./components/navbar/NavBar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./components/pages/404/404Page";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/pages/home/homePage";
import About from "./components/pages/about/aboutPage";
import Contact from "./components/pages/contact/contactPage";
import UserSignup from "./components/pages/user-signup/UserSignup";
import * as apiCalls from "./api/apiCalls";
import Login from "./components/pages/login/login";

import CreateEvent from "./components/pages/events/CreateEvent";
import ShowEvents from "./components/pages/events/ShowEvents";
import EventDetail from "./components/pages/events/EventDetail";
import EventUpdate from "./components/pages/events/EventUpdate";

function App() {
  // will be changed later just for demo
  const actions = {
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login,
  };

  return (
    <Router>
      <Header />
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<UserSignup actions={actions} />} />
          <Route path="/login" element={<Login actions={actions} />} />

          <Route exact path="/event" element={<ShowEvents />} />
          <Route path="/event/createEvent" element={<CreateEvent/>} />
          <Route path="/event/:id/" element={<EventDetail/>} />
          <Route path="/event/:id/update" element={<EventUpdate/>} />

          <Route path="*" exact element={<PageNotFound/>} />
        </Routes> 
        
      </div>
       <Footer /> 
    </Router>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/navbar/NavBar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/404/404Page";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/homePage";
import About from "./pages/about/aboutPage";
import Contact from "./pages/contact/contactPage";
import UserSignup from "./pages/user-signup/UserSignup";
import * as apiCalls from "./api/apiCalls";
import Login from "./pages/login/login";

import CreateEvent from "./pages/events/CreateEvent";
import ShowEvents from "./pages/events/ShowEvents";
import EventDetail from "./pages/events/EventDetail";
import EventUpdate from "./pages/events/EventUpdate";
import RouterWrapper from "./components/router-wrapper/RouterWrapper";
import Scholarship from './pages/Scholarships/ScholarshipPage';
import AddScholarship from './pages/Scholarships/AddScholarship';
import ScholarshipDetails from './pages/Scholarships/ScholarshipDetails';
import ManageScholarship from './pages/Scholarships/ManageScholarship';

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
          <Route element={<RouterWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/signup/" element={<UserSignup actions={actions} />} />
            <Route path="/login/" element={<Login actions={actions} />} />
            <Route exact path="/event/" element={<ShowEvents />} />
            <Route path="/event/createEvent/" element={<CreateEvent />} />
            <Route path="/event/:id/" element={<EventDetail />} />
            <Route path="/event/:id/update/" element={<EventUpdate />} />
            <Route path="/scholarships" element={<Scholarship />} />
            <Route path="/scholarships/addscholarship" element={<AddScholarship />} />
            <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
            <Route path="/scholarships/:id/managescholarship" element={<ManageScholarship />} />
          </Route>

          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

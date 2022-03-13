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

import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboard-home/DashboardHome";
import Userlist from "./pages/dashboard/user/Userlist";
import Userprofile from "./pages/dashboard/userProfile/Userprofile";

import Teams from "./pages/dashboard/teams/Teams";
import Gallery from "./pages/gallery/Gallery";
import GalleryEdit from "./pages/gallery/GalleryEdit";
import AsyncPaginationExample from "./pages/dashboard/userProfile/UserTest";

function App() {
  // will be changed later just for demo
  const actions = {
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login,
  };

  return (
    <Router>
      <div className="page">
        <Header />
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route element={<RouterWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/about/" element={<About />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/userTest" element={<AsyncPaginationExample />} />

              <Route
                path="/signup/"
                element={<UserSignup actions={actions} />}
              />
              <Route path="/login/" element={<Login actions={actions} />} />

              <Route exact path="/event/" element={<ShowEvents />} />
              <Route path="/event/createEvent/" element={<CreateEvent />} />
              <Route path="/event/:id/" element={<EventDetail />} />
              <Route path="/event/:id/update/" element={<EventUpdate />} />

              <Route path="/teams" element={<Teams />} />

              <Route path="/dashboard" exact element={<Dashboard />}>
                <Route path="galleryEdit" exact element={<GalleryEdit />} />
                <Route path="teams" exact element={<Teams />} />
                <Route path="home" exact element={<DashboardHome />} />
                <Route path="userlist" exact element={<Userlist />} />
                <Route
                  path="userprofile/:id/"
                  exact
                  element={<Userprofile />}
                />
                <Route path="userprofile/" exact element={<Userprofile />} />
                <Route
                  path="userprofile/:id/"
                  exact
                  element={<Userprofile />}
                />
              </Route>
            </Route>

            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

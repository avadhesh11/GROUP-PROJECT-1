import "./App.css";
import Cookies from "js-cookie";

import { Routes, Route } from "react-router-dom";
import Sign from "./components/signup.jsx";
import Login from "./components/login.jsx";
import WeddingCategories from "./components/WeddingCategories.jsx";
import VenuePage from "./components/VenuePage.jsx";
import ThemePage from "./components/ThemePage.jsx";
import FoodPage from "./components/FoodPage.jsx";
import MusicPage from"./components/MusicPage.jsx";
import PhotographyPage from "./components/PhotographyPage.jsx";
import InvitationPage from "./components/Invitation.jsx";
import Footer from "./components/Footer.jsx";
import VenueInnerPage from "./components/InnerVenue.jsx";
import MusicInnerPage from "./components/InnerMusic.jsx";
import ThemeInnerPage from "./components/InnerTheme.jsx";
import PhotoInnerPage from "./components/InnerPhoto.jsx";
import FoodInnerPage from "./components/InnerFood.jsx";
import InviteInnerPage from "./components/InnerInvitation.jsx";
import Profile from "./components/profile.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WeddingCategories" element={<WeddingCategories />} />
        <Route path="/VenuePage" element={<VenuePage />} />
        <Route path="/ThemePage" element={<ThemePage />} />
        <Route path="/FoodPage" element={<FoodPage />} />
        <Route path="/MusicPage" element={<MusicPage />} />
        <Route path="/PhotographyPage" element={<PhotographyPage />} />
        <Route path="/VenueInnerPage" element={<VenueInnerPage />} />
          <Route path="/InvitationPage" element={<InvitationPage />} />
          <Route path="/MusicInnerPage" element={<MusicInnerPage />} />
           <Route path="/PhotoInnerPage" element={<PhotoInnerPage />} />
          <Route path="/ThemeInnerPage" element={<ThemeInnerPage />} />
           <Route path="/InviteInnerPage" element={<InviteInnerPage />} />
          <Route path="/FoodInnerPage" element={<FoodInnerPage />} />
          <Route path="/Profile" element={<Profile />} />
       </Routes>
      <div className="h-[10vh]"/>
      <Footer/>
    </>
  );
}

export default App;

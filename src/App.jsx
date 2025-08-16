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
import { ThemeProvider } from "./context/themecontext.jsx";

function App() {
  return (
    <>
    <ThemeProvider>
        <div className="bg-white dark:bg-black text-black dark:text-white p-4">
  If dark mode works, this box should turn black with white text.
</div>
      <Routes>
      
        <Route path="/" element={<WeddingCategories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/WeddingCategories" element={<WeddingCategories />} />

        <Route path="/VenuePage" element={<VenuePage />} />
        <Route path="/ThemePage" element={<ThemePage />} />
        <Route path="/FoodPage" element={<FoodPage />} />
        <Route path="/MusicPage" element={<MusicPage />} />
        <Route path="/PhotographyPage" element={<PhotographyPage />} />
        <Route path="/InvitationPage" element={<InvitationPage />} />

           <Route path="/VenueInnerPage/:id" element={<VenueInnerPage />} />
          <Route path="/MusicInnerPage/:id" element={<MusicInnerPage />} />
           <Route path="/PhotoInnerPage/:id" element={<PhotoInnerPage />} />
          <Route path="/ThemeInnerPage/:id" element={<ThemeInnerPage />} />
           <Route path="/InviteInnerPage/:id" element={<InviteInnerPage />} />
          <Route path="/FoodInnerPage/:id" element={<FoodInnerPage />} />
          
          <Route path="/Profile" element={<Profile />} />
       </Routes>
       </ThemeProvider>
      <div className="h-[10vh]"/>
      <Footer/>
    </>
  );
}

export default App;

import "./App.css";
import Cookies from "js-cookie";

import { Routes, Route } from "react-router-dom";
import Sign from "./components/signup.jsx";
import Login from "./components/login.jsx";
import WeddingCategories from "./components/WeddingCategories.jsx";
import VenuePage from "./components/VenuePage.jsx";
import ThemePage from "./components/ThemePage.jsx";
import FoodPage from "./components/FoodPage.jsx";
import PhotographyPage from "./components/PhotographyPage.jsx";
import Footer from "./components/Footer.jsx";
import VenueInnerPage from "./components/InnerVenue.jsx";



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
        <Route path="/PhotographyPage" element={<PhotographyPage />} />
        <Route path="/VenueInnerPage" element={<VenueInnerPage />} />
       </Routes>
      <div className="h-[10vh]"/>
      <Footer/>
    </>
  );
}

export default App;

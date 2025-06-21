import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Sign from './components/signup.jsx';
import Login from './components/login.jsx';

import WeddingCategories from './components/WeddingCategories';
import VenuePage from'./components/VenuePage.jsx';
import ThemePage from'./components/ThemePage.jsx';
import FoodPage from './components/FoodPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/WeddingCategories" element={<WeddingCategories />}/>
      <Route path= "/VenuePage" element={<VenuePage />}/>
      <Route path= "/ThemePage" element={<ThemePage />}/>
      <Route path= "/FoodPage" element={<FoodPage />}/>
    </Routes>
    
    </>
  )
}

export default App

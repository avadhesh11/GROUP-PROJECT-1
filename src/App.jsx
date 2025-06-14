import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Sign from './components/signup.jsx';
import Login from './components/login.jsx';

import WeddingCategories from './components/WeddingCategories';

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/WeddingCategories" element={<WeddingCategories />}/>
    </Routes>
    
    </>
  )
}

export default App

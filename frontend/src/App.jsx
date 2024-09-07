import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import Homepage from './pages/homepage/homepage'
import { Routes, Route, useNavigationType, useLocation, } from "react-router-dom"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App

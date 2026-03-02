import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import PokemonCarousel from './pages/PokemonCarousel.jsx'
import PokemonSearch from './pages/PokemonSearch.jsx'
import PokemonDeck from './pages/PokemonDeck.jsx'
import { useNavigate } from 'react-router-dom'


function App() {
  return (
    <>
      <Navbar />
        <div className='header'>
          <h1>POKEMON GO!</h1>
        </div>
        <Routes>
          <Route path="/" element={<PokemonCarousel />} />
          <Route path="/search" element={<PokemonSearch />} />
          <Route path="/deck" element={<PokemonDeck />} />
        </Routes>
    </>
  );
}

export default App

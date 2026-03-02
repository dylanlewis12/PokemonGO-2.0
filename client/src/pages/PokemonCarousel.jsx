import { useState, useEffect, useRef } from "react";
import '../styles/pages/PokemonCarousel.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const typeColors = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0",
  electric: "#F8D030", grass: "#78C850", ice: "#98D8D8",
  fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8",
  dark: "#705848", steel: "#B8B8D0", fairy: "#EE99AC",
};

export default function PokemonCarousel() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  function handleNavigate() {
    navigate('/search');
  }

  async function fetchPokemon() {
    try {
      const randomNum = Math.floor(Math.random() * 1025) + 1;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
      const data = res.data;
      setFade(false);
      setTimeout(() => {
        setPokemon(data);
        setLoading(false);
        setFade(true);
      }, 300);
      console.log(data);
    } catch (err) {
      console.error("Error fetching Pokémon:", err.message);
    }
  }

  useEffect(() => {
    fetchPokemon();
    timerRef.current = setInterval(fetchPokemon, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const primaryType = pokemon?.types?.[0]?.type?.name;
  const secondaryType = pokemon?.types?.[1]?.type?.name;
  const primaryColor = typeColors[primaryType] || "#A8A878";
  const secondaryColor = typeColors[secondaryType] || "#999";
  const ability1 = pokemon?.abilities?.[0]?.ability?.name ?? "None";
  const ability2 = pokemon?.abilities?.[1]?.ability?.name ?? null;

  return (
    <div className="page-wrap">
      <h2 onClick={handleNavigate}>Press to start</h2>

      <div className="card-container">
        <div className={`card${fade ? "" : " fade-out"}`}>

          <span id="pokemonName">
            {loading ? "Loading..." : pokemon?.name}
          </span>

          <div className="card-header">
            <span id="pokemonNumber" style={{ color: primaryColor }}>
              {loading ? "---" : `#${String(pokemon?.id).padStart(3, "0")}`}
            </span>
          </div>

          {loading
            ? <div className="img-placeholder" />
            : <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
          }

          <div className="card-types">
            {primaryType && (
              <span className="type-badge" style={{ backgroundColor: primaryColor }}>{primaryType}</span>
            )}
            {secondaryType && (
              <span className="type-badge" style={{ backgroundColor: secondaryColor }}>{secondaryType}</span>
            )}
          </div>

          <div className="content-container">
            <span className="ability">{loading ? "ability 1" : ability1}</span>
            {ability2 && <span className="ability">{ability2}</span>}
          </div>

          <button className="next-btn" onClick={fetchPokemon}>
            Next Pokémon →
          </button>
        </div>
      </div>
    </div>
  );
}
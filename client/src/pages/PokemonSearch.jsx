import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/pages/PokemonSearch.css";

export default function PokemonSearch() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  // Load all pokemon once
  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10000"
        );
        setAllPokemon(res.data.results);
        console.log(`Loaded ${res.data.results.length} pokemon`);
      } catch (err) {
        console.error("Error fetching pokemon list:", err);
      }
    };

    getAllPokemon();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = allPokemon
      .filter((p) =>
        p.name.toLowerCase().startsWith(value.toLowerCase())
      )
      .slice(0, 10);

    setSuggestions(filtered);
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), [
    allPokemon,
  ]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = async (pokemon) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setCurrentPokemon(res.data);
      setSuggestions([]);
      setQuery(pokemon.name);
    } catch (err) {
      console.error("Error fetching pokemon:", err);
    }
  };

  const handleAddCard = () => {
    if (!currentPokemon) {
      alert("Please select a Pokemon first!");
      return;
    }

    const currentDeck = localStorage.getItem("pokemonDeck");
    let dataArray = currentDeck ? JSON.parse(currentDeck) : [];

    if (!Array.isArray(dataArray)) dataArray = [];

    dataArray.push(currentPokemon);
    localStorage.setItem("pokemonDeck", JSON.stringify(dataArray));

    alert("Card was successfully added to your deck ✅");
  };

  return (
    <>
      <div className="search-form-wrapper">
        <form className="search-form">
          <label>Poke Finder:</label>
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter Pokemon name..."
          />
          {suggestions.length > 0 && (
            <ul id="suggestions-container" className="active">
              {suggestions.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="card-container">
        {currentPokemon && <PokemonCard pokemon={currentPokemon} />}
      </div>
      {currentPokemon && (
        <div className="button-wrapper">
          <button id="add-btn" onClick={handleAddCard}>
            Add Card
          </button>
        </div>
      )}
    </>
  );
}


function PokemonCard({ pokemon }) {
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const primaryType = pokemon.types[0].type.name;
  const typeColor = typeColors[primaryType] || "#A8A878";

  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const pokemonNum = String(pokemon.id).padStart(3, "0");

  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(135deg, ${typeColor}EE 0%, ${typeColor}DD 100%)`,
        borderColor: typeColor,
      }}
    >
      <div className="card-header">
        <p id="pokemonName">{pokemonName}</p>
        <p id="pokemonNumber" style={{ color: typeColor }}>
          #{pokemonNum}
        </p>
      </div>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemonName}
      />

      <div className="card-types">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="type-badge"
            style={{
              backgroundColor: typeColors[type.type.name],
            }}
          >
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="content-container">
        <p><strong>Abilities:</strong></p>
        {pokemon.abilities.map((a) => (
          <p key={a.ability.name}>
            ⭐ {a.ability.name}
          </p>
        ))}
      </div>
    </div>
  );
}
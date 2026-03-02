import { useEffect, useState } from "react";
import '../styles/pages/PokemonDeck.css'

export default function PokemonDeck() {
  const [deck, setDeck] = useState([]);

  // Load deck on mount
  useEffect(() => {
    const storedDeck = localStorage.getItem("pokemonDeck");
    let dataArray = storedDeck ? JSON.parse(storedDeck) : [];

    if (!Array.isArray(dataArray)) {
      console.error("pokemonDeck is not an array. Resetting.");
      dataArray = [];
    }

    setDeck(dataArray);
  }, []);

  const handleClearDeck = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire Pokemon Deck?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("pokemonDeck");
    setDeck([]);
    alert("Poke Deck has been cleared successfully!");
  };

  return (
    <div className="card-binder">
      <div className="card-container">
        {deck.length === 0 ? (
          <div className="empty-message">
            <h2>Your deck is empty</h2>
            <p>Add Pokémon from the search page!</p>
          </div>
        ) : (
          deck.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        )}
      </div>

      <button id="delete-btn" onClick={handleClearDeck}>
        Clear Deck
      </button>
    </div>
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
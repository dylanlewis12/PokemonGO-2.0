import { useEffect, useState } from "react";
import '../styles/pages/PokemonDeck.css'

export default function PokemonDeck() {
  const [deck, setDeck] = useState([]);

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
    <div className="deck">
      <div className="deck__cards">
        {deck.length === 0 ? (
          <div className="deck-empty">
            <h2 className="deck-empty__title">Your deck is empty</h2>
            <p className="deck-empty__text">Add Pokémon from the search page!</p>
          </div>
        ) : (
          deck.map((pokemon, index) => (
            <DeckCard key={index} pokemon={pokemon} />
          ))
        )}
      </div>

      <div className="deck-controls">
        <button className="deck-controls__clear-btn" onClick={handleClearDeck}>
          Clear Deck
        </button>
      </div>
    </div>
  );
}

function DeckCard({ pokemon }) {
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
      className="deck-card"
      style={{
        background: `linear-gradient(135deg, ${typeColor}EE 0%, ${typeColor}DD 100%)`,
        borderColor: typeColor,
      }}
    >
      <div className="deck-card__header">
        <p className="deck-card__name">{pokemonName}</p>
        <p className="deck-card__number" style={{ color: typeColor }}>
          #{pokemonNum}
        </p>
      </div>

      <img
        className="deck-card__image"
        src={pokemon.sprites.front_default}
        alt={pokemonName}
      />

      <div className="deck-card__types">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="deck-card__type-badge"
            style={{
              backgroundColor: typeColors[type.type.name],
            }}
          >
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="deck-card__content">
        <p style={{color: 'black'}}><strong>Abilities:</strong></p>
        {pokemon.abilities.map((a) => (
          <p key={a.ability.name} className="deck-card__ability">
            ⭐ {a.ability.name}
          </p>
        ))}
      </div>
    </div>
  );
}

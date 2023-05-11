import React from 'react';
import { Pokemon } from '../interfaces';

interface Props {
  pokemon: Pokemon | null; 
  handleFavorite: (pokemon: Pokemon) => void;
  isFavorite: boolean;
}

const PokemonCard: React.FC<Props> = ({ pokemon, handleFavorite, isFavorite }) => {
  if (!pokemon) {
    return null; 
  }

  return (
    <div className="pokemon-card">
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <button onClick={() => handleFavorite(pokemon)}>
        {isFavorite ? 'Release' : 'Catch'}
      </button>
    </div>
  );
};

export default PokemonCard;

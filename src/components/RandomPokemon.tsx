import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../interfaces';
import { fetchRandomPokemon } from '../services/DataService';

interface Props {
  onAddFavorite: (pokemon: Pokemon) => void;
  onRemoveFavorite: (pokemonId: number) => void;
  favoritePokemonIds: number[];
}

const RandomPokemon: React.FC<Props> = ({ onAddFavorite, onRemoveFavorite, favoritePokemonIds }) => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchRandomPokemonData = async () => {
      try {
        const pokemon = await fetchRandomPokemon();
        setRandomPokemon(pokemon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomPokemonData();
  }, []);

  const handleGetRandomPokemon = () => {
    setRandomPokemon(null);
  };

  const handleToggleFavorite = (pokemon: Pokemon) => {
    if (favoritePokemonIds.includes(pokemon.id)) {
      onRemoveFavorite(pokemon.id);
    } else {
      onAddFavorite(pokemon);
    }
  };

  return (
    <div>
      <h1>Random Pokemon</h1>
      {randomPokemon ? (
        <PokemonCard
          pokemon={randomPokemon}
          handleFavorite={handleToggleFavorite}
          isFavorite={favoritePokemonIds.includes(randomPokemon.id)}
        />
      ) : (
        <div>Loading...</div>
      )}
      <Button variant="primary" onClick={handleGetRandomPokemon}>
        Get Random Pokemon
      </Button>
    </div>
  );
};

export default RandomPokemon;

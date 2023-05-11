import { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  }
  
}

interface PokemonCardProps {
  pokemon: Pokemon;
  imageUrl: string;
  onAddFavorite?: () => void;
}

export function PokemonCard({ pokemon, onAddFavorite, imageUrl }: PokemonCardProps) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(true);
    const favoritePokemon = JSON.parse(localStorage.getItem('favoritePokemon') || '[]');
    favoritePokemon.push(pokemon);
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));

    if (onAddFavorite) {
      onAddFavorite();
    }
  };



  return (
    <div className="text-center">
      <h2>Pokemon Details</h2>
      <div>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
      </div>
      <h3>Pokemon Name: {pokemon.name}</h3>
      <h4>Types: {pokemon.types.join(', ')}</h4>
      <h4>Height: {pokemon.height}</h4>
      <h4>Weight: {pokemon.weight}</h4>
      {favorite ? (
        <Button variant="danger" disabled>
          Favorite
        </Button>
      ) : (
        <Button variant="primary" onClick={handleFavorite}>
          Add Favorite
        </Button>
      )}
    </div>
  );
}

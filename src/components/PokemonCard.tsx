import { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(true);
        // Save the favorite Pokemon to local storage
        const favoritePokemon = JSON.parse(localStorage.getItem('favoritePokemon') || '[]');
        favoritePokemon.push(pokemon);
        localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));
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
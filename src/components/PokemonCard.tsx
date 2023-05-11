import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

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
  onFavorite?: (pokemon: Pokemon) => void;
  onRemoveFavorite?: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onFavorite, onRemoveFavorite }: PokemonCardProps) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(true);
    if (onFavorite) {
      onFavorite(pokemon);
    }
  };

  const handleRemoveFavorite = () => {
    setFavorite(false);
    if (onRemoveFavorite) {
      onRemoveFavorite(pokemon);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={pokemon.imageUrl} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <div>Type: {pokemon.types.join(', ')}</div>
        <div>Height: {pokemon.height} m</div>
        <div>Weight: {pokemon.weight} kg</div>
        {favorite ? (
          <Button variant="danger" onClick={handleRemoveFavorite}>
            Remove Favorite
          </Button>
        ) : (
          <Button variant="primary" onClick={handleFavorite}>
            Add Favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

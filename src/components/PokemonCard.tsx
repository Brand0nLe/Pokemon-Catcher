import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(true);
    const savedPokemon = localStorage.getItem('favoritePokemon');
    if (savedPokemon) {
      const favoritePokemon = JSON.parse(savedPokemon);
      localStorage.setItem(
        'favoritePokemon',
        JSON.stringify([...favoritePokemon, pokemon])
      );
    } else {
      localStorage.setItem('favoritePokemon', JSON.stringify([pokemon]));
    }
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={pokemon.imageUrl} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        {favorite ? (
          <Button variant="danger" disabled>
            Favorite
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

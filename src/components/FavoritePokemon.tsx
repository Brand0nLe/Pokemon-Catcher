import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Pokemon } from './PokemonCard';

function FavoritePokemon() {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const savedPokemon = localStorage.getItem('favoritePokemon');
    if (savedPokemon) {
      setFavoritePokemon(JSON.parse(savedPokemon));
    }
  }, []);

  const handleRemoveFavorite = (pokemonId: number) => {
    const updatedFavoritePokemon = favoritePokemon.filter(pokemon => pokemon.id !== pokemonId);
    setFavoritePokemon(updatedFavoritePokemon);
    localStorage.setItem('favoritePokemon', JSON.stringify(updatedFavoritePokemon));
  };

  return (
    <div>
      {favoritePokemon.map(pokemon => (
        <Card key={pokemon.id} className="mb-4">
          <Card.Img variant="top" src={pokemon.imageUrl} />
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Button variant="danger" onClick={() => handleRemoveFavorite(pokemon.id)}>
              Remove Favorite
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default FavoritePokemon;

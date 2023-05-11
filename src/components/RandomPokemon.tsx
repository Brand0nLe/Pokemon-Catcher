import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Pokemon, PokemonCard } from './PokemonCard';

function RandomPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Generate a random ID between 1 and 898
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.front_default,
        };
        setRandomPokemon(pokemon);
      } catch (error) {
        setError(true);
      }
    };

    fetchRandomPokemon();
  }, []);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {randomPokemon ? (
        <Card className="mb-4">
          <Card.Img variant="top" src={randomPokemon.imageUrl} />
          <Card.Body>
            <Card.Title>{randomPokemon.name}</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default RandomPokemon;
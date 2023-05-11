import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { PokemonCard, Pokemon } from './PokemonCard';

function RandomPokemon() {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const pokemonData = await fetch(data.results[randomIndex].url);
        const pokemon = await pokemonData.json();
        const randomPokemon: Pokemon = {
          id: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.sprites.front_default,
          types: pokemon.types.map((type: any) => type.type.name),
          height: pokemon.height / 10,
          weight: pokemon.weight / 10,
        };
        setRandomPokemon(randomPokemon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomPokemon();
  }, []);

  const handleGetRandomPokemon = () => {
    fetchRandomPokemon();
  };

  return (
    <div>
      <h1>Random Pokemon</h1>
      {randomPokemon ? (
        <PokemonCard pokemon={randomPokemon} />
      ) : (
        <div>Loading...</div>
      )}
      <Button variant="primary" onClick={handleGetRandomPokemon}>
        Get Random Pokemon
      </Button>
    </div>
  );
}

export default RandomPokemon;

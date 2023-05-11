import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Pokemon, PokemonCard } from './PokemonCard';

function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.front_default,
          types: data.types.map((type: any) => type.type.name),
          height: data.height / 10,
          weight: data.weight / 10,
        };
        setPokemon(pokemon);
      } catch (error) {
        setError(true);
      }
    };

    fetchPokemon();
  }, [id]);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Container className="mt-4">
      {pokemon ? (
        <PokemonCard pokemon={pokemon} />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default PokemonDetails;

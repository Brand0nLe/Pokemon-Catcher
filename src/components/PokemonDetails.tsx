import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Pokemon, PokemonCard } from './PokemonCard';

interface PokemonDetailsProps {
  onAddFavorite: (pokemon: Pokemon) => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ onAddFavorite }: PokemonDetailsProps) => {
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
          sprites: {
            front_default: data.sprites.front_default,
            front_shiny: data.sprites.front_shiny,
          },
          types: data.types.map((type: any) => type.type.name),
          height: data.height,
          weight: data.weight,
        };

        setPokemon(pokemon);
      } catch (error) {
        console.error(error);
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
        <PokemonCard pokemon={pokemon} onAddFavorite={onAddFavorite} />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default PokemonDetails;

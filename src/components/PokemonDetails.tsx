import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../interfaces';

interface PokemonDetailsProps {
  onAddFavorite: (pokemon: Pokemon) => void;
  onRemoveFavorite: (pokemonId: number) => void;
  favoritePokemonIds: number[];
}

function PokemonDetails({ onAddFavorite, onRemoveFavorite, favoritePokemonIds }: PokemonDetailsProps) {
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
          types: data.types.map((type: any) => ({
            slot: type.slot,
            type: {
              name: type.type.name,
            },
          })),
          height: data.height,
          weight: data.weight,
          abilities: [],
          evolution_chain: { chain: { species: { name: '' }, evolves_to: [] } },
          moves: [],
        };

        setPokemon(pokemon);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleToggleFavorite = (pokemon: Pokemon) => {
    if (favoritePokemonIds.includes(pokemon.id)) {
      onRemoveFavorite(pokemon.id);
    } else {
      onAddFavorite(pokemon);
    }
  };

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Container className="mt-4">
      {pokemon ? (
        <PokemonCard
          pokemon={pokemon}
          handleFavorite={handleToggleFavorite}
          isFavorite={favoritePokemonIds.includes(pokemon.id)}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default PokemonDetails;

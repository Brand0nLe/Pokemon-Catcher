import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, CardDeck, Container } from 'react-bootstrap';
import { PokemonCard } from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
}

function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchPokemonList = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
          const data = await response.json();
          const pokemonData = await Promise.all(
            data.results.map(async (result: any) => {
              const response = await fetch(result.url);
              const data = await response.json();
              const pokemon: Pokemon = {
                id: data.id,
                name: data.name,
                imageUrl: data.sprites.front_default,
                types: data.types.map((type: any) => type.type.name),
                height: data.height / 10,
                weight: data.weight / 10,
              };
              return pokemon;
            })
          );
          setPokemonList(pokemonData);
        } catch (error) {
          setError(true);
        }
      };
      fetchPokemonList();
    }, []);
  
    if (error) {
      return <div>Error loading data</div>;
    }
  
    return (
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Link to="/random">
            <Button variant="primary">Random Pokemon</Button>
          </Link>
        </div>
        <CardDeck>
          {pokemonList.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </CardDeck>
      </Container>
    );
  }
  
  export default PokemonList;
  

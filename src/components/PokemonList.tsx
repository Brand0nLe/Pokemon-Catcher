import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import '../styles/style.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  moves: { move: { name: string } }[];
  types: { slot: number; type: { name: string } }[];
  abilities: { slot: number; ability: { name: string } }[];
}

function PokemonList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a Pokemon name');
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
      setPokemon(null);
    }
  };

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    window.location.href = `/pokemon/${randomId}`;
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        const fetchedPokemon = await Promise.all(
          data.results.map(async (result: any) => {
            const response = await fetch(result.url);
            const data = await response.json();
            const pokemon: Pokemon = {
              id: data.id,
              name: data.name,
              sprites: {
                front_default: data.sprites.front_default,
                back_default: data.sprites.back_default,
                front_shiny: data.sprites.front_shiny,
                back_shiny: data.sprites.back_shiny,
              },
              moves: data.moves,
              types: data.types,
              abilities: data.abilities,
            };
            return pokemon;
          })
        );
        setPokemon(fetchedPokemon[0]);
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
      <h1 className="text-center">Pokemon Search</h1>
      <div className="d-flex justify-content-center mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Pokemon Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" onClick={handleRandom}>
          Random Pokemon
        </Button>
      </div>
      {pokemon && (
        <Card className="mt-4 pokemon-card">
          <Card.Body>
           
          <Card.Title className="text-center">{pokemon.name}</Card.Title>
            <Row>
              <Col sm={6} md={3} className="text-center">
                <img src={pokemon.sprites.front_default} alt="Front Sprite" className="pokemon-image" />
                <p>Front</p>
              </Col>
              <Col sm={6} md={3} className="text-center">
                <img src={pokemon.sprites.back_default} alt="Back Sprite" className="pokemon-image" />
                <p>Back</p>
              </Col>
              <Col sm={6} md={3} className="text-center">
                <img src={pokemon.sprites.front_shiny} alt="Front Shiny Sprite" className="pokemon-image" />
                <p>Shiny Front</p>
              </Col>
              <Col sm={6} md={3} className="text-center">
                <img src={pokemon.sprites.back_shiny} alt="Back Shiny Sprite" className="pokemon-image" />
                <p>Shiny Back</p>
              </Col>
            </Row>
            <div className="pokemon-info">
              <h5>Moves:</h5>
              <div className="pokemon-moves">
                {pokemon.moves.map((move) => (
                  <div key={move.move.name}>{move.move.name}</div>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Types:</h5>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <div key={type.slot}>{type.type.name}</div>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Abilities:</h5>
              <div className="pokemon-abilities">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.slot}>{ability.ability.name}</div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default PokemonList;

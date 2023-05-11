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

      if (response.ok) {
        const data = await response.json();
        setPokemon(data);
      } else if (response.status === 404) {
        alert('Invalid Pokemon name, please search for a real pokemon!');
        setPokemon(null);
      } else {
        throw new Error('Failed to fetch Pokemon data');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while fetching Pokemon data');
      setPokemon(null);
    }
  };


  const handleRandom = async () => {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
      setPokemon(null);
    }
  };

  useEffect(() => {
    handleRandom();
  }, []);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center">Pokedex</h1>
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
            <button className="btn btn-primary" type="button" onClick={handleRandom}>
              Random Pokemon
            </button>
          </div>
        </div>
      </div>
      {pokemon && (
        <Card className="mt-4">
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
                {pokemon.moves.map((move, index) => (
                  <span key={move.move.name}>
                    {index > 0 && ", "}
                    {move.move.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Types:</h5>
              <div className="pokemon-types">
                {pokemon.types.map((type, index) => (
                  <span key={type.slot}>
                    {index > 0 && ", "}
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Abilities:</h5>
              <div className="pokemon-abilities">
                {pokemon.abilities.map((ability, index) => (
                  <span key={ability.slot}>
                    {index > 0 && ", "}
                    {ability.ability.name}
                  </span>
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


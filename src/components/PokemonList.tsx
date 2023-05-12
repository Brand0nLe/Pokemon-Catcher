import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Pokemon } from '../interfaces';
import PokemonCard from './PokemonCard';
import '../styles/style.css';

function PokemonList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>(() => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a Pokemon name');
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);

      if (response.ok) {
        const data = await response.json();

        const abilityResponse = await fetch(data.abilities[0].ability.url);
        const abilityData = await abilityResponse.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();


        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.front_default,
          sprites: {
            front_default: data.sprites.front_default,
            front_shiny: data.sprites.front_shiny,
            back_default: data.sprites.back_default,
            back_shiny: data.sprites.back_shiny,

          },
          types: data.types.map((type: any) => ({
            slot: type.slot,
            type: {
              name: type.type.name,
            },
          })),
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((ability: any) => ({
            ability: {
              name: ability.ability.name,
              url: ability.ability.url,
            },
          })),
          evolution_chain: data.evolution_chain,
          moves: data.moves.map((move: any) => ({
            move: {
              name: move.move.name,
            },
          })),
        };


        setPokemon(pokemon);
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

  const handleFavorite = (selectedPokemon: Pokemon) => {
    const isFavorite = favorites.some((pokemon) => pokemon.id === selectedPokemon.id);
    if (isFavorite) {
      setFavorites((prevFavorites) => prevFavorites.filter((pokemon) => pokemon.id !== selectedPokemon.id));
      alert(`${selectedPokemon.name} has been released from favorites!`);
    } else {
      const newFavorite: Pokemon = {
        ...selectedPokemon,
        imageUrl: selectedPokemon.sprites.front_default,
      };
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
      alert(`${selectedPokemon.name} caught and added to favorites!`);
    }
  };


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  useEffect(() => {
    handleRandom();
  }, []);

  if (error) {
    return <div>Error loading data</div>;
  }




  return (
    <Container className="mt-4 transparent-bg">
      <h1 className="text-center">Who's That Pokemon?</h1>
      <div className="mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Pokemon Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="input-group-append">
            <Button className="btn btn-primary" type="button" onClick={handleSearch}>
              Search
            </Button>
            <Button className="btn btn-primary" type="button" onClick={handleRandom}>
              Random Pokemon
            </Button>
            {pokemon && (
              <Button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  favorites.some((favPokemon) => favPokemon.id === pokemon.id)
                    ? handleFavorite(pokemon)
                    : handleFavorite(pokemon)
                }
              >
                {favorites.some((favPokemon) => favPokemon.id === pokemon.id) ? 'Release' : 'Catch'}
              </Button>
            )}
          </div>
        </div>
      </div>
      {pokemon && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title className="text-center">{pokemon.name}</Card.Title>
            <Row>
              <Col sm={6} md={3}>
                <img src={pokemon.sprites.front_default} alt="Front Sprite" className="pokemon-image" />
              </Col>
              <Col sm={6} md={3}>
                <img src={pokemon.sprites.back_default} alt="Front Sprite" className="pokemon-image" />
              </Col>
              <Col sm={6} md={3}>
                <img src={pokemon.sprites.front_shiny} alt="Shiny Front Sprite" className="pokemon-image" />
              </Col>
              <Col sm={6} md={3}>
                <img src={pokemon.sprites.back_shiny} alt="Shiny Front Sprite" className="pokemon-image" />
              </Col>
            </Row>
            <div className="pokemon-info">
              <h5>Types:</h5>
              <div className="pokemon-types">
                {pokemon.types.map((type, index) => (
                  <span key={type.slot}>
                    {index > 0 && ', '}
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Abilities:</h5>
              <div className="pokemon-abilities">
                {pokemon.abilities.map((ability) => (
                  <span key={ability.ability.name}>{ability.ability.name}</span>
                ))}
              </div>
            </div>
            <div className="pokemon-info">
              <h5>Moves:</h5>
              <div className="pokemon-moves">
                {pokemon.moves.map((move, index) => (
                  <span key={`${move.move.name}-${index}`}>
                    {index > 0 && ', '}
                    {move.move.name}
                  </span>
                ))}
              </div>
            </div>

          </Card.Body>
        </Card>
      )}

      {/* Favorite Pokemon section */}
      <h2 className="mt-4 text-center">Pokemon Storage</h2>
      <div className="favorite-pokemon">
        {favorites.map((favPokemon) => (
          <PokemonCard key={favPokemon.id} pokemon={favPokemon} handleFavorite={handleFavorite} isFavorite={true} />
        ))}
      </div>
    </Container>
  );
}

export default PokemonList;
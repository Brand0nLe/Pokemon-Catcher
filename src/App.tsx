import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemon from './components/FavoritePokemon';
import RandomPokemon from './components/RandomPokemon';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/" className="text-white">
            Pokemon App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/favorite" className="text-white">
                Favorite Pokemon
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container mt-4">
          <Route path="/" component={PokemonList} />
          <Route path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/favorite" component={FavoritePokemon} />
          <Route path="/random" component={RandomPokemon} />
        </div>
      </div>
    </Router>
  );
}

export default App;
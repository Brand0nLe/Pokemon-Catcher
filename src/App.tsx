import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemon from './components/FavoritePokemon';
import RandomPokemon from './components/RandomPokemon';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="mr-auto">
              <Link to="/" className="text-white text-decoration-none">
                Pokemon App
              </Link>
            </Typography>
            <Link to="/favorite" className="text-white text-decoration-none">
              Favorite Pokemon
            </Link>
          </Toolbar>
        </AppBar>
        <div className="container mt-4">
          <Switch>
            <Route path="/" exact>
              <PokemonList />
            </Route>
            <Route path="/pokemon/:id">
              <PokemonDetails />
            </Route>
            <Route path="/favorite">
              <FavoritePokemon />
            </Route>
            <Route path="/random">
              <RandomPokemon />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;


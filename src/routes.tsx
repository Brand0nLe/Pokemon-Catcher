import { RouteProps } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemon from './components/FavoritePokemon';
import RandomPokemon from './components/RandomPokemon';

interface CustomRouteProps {
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
}

const routes: CustomRouteProps[] = [
  {
    path: '/',
    exact: true,
    component: PokemonList,
  },
  {
    path: '/pokemon/:id',
    component: PokemonDetails,
  },
  {
    path: '/favorite',
    component: FavoritePokemon,
  },
  {
    path: '/random',
    component: RandomPokemon,
  },
];

export default routes;

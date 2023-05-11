import { RouteProps } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemon from './components/FavoritePokemon';
import RandomPokemon from './components/RandomPokemon';

type CustomRouteProps = RouteProps & {
  exact?: boolean;
};

const routes: CustomRouteProps[] = [
  {
    path: '/',
    exact: true,
    Component: PokemonList,
  },
  {
    path: '/pokemon/:id',
    Component: PokemonDetails,
  },
  {
    path: '/favorite',
    Component: FavoritePokemon,
  },
  {
    path: '/random',
    Component: RandomPokemon,
  },
];

export default routes;

import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
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
    path: '/random',
    component: RandomPokemon,
  },
];

export default routes;

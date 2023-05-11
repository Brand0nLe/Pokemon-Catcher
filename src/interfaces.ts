export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: { slot: number; type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string; url: string } }[];
  evolution_chain: { chain: { species: { name: string }; evolves_to: { species: { name: string }[] }[] } };
  moves: { move: { name: string } }[];
}
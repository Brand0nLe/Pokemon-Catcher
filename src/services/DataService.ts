const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonByName(name: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      throw new Error('Invalid Pokemon name');
    } else {
      throw new Error('Failed to fetch Pokemon data');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error occurred while fetching Pokemon data');
  }
}

export async function fetchRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`${API_BASE_URL}/pokemon/${randomId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch random Pokemon data');
  }
}
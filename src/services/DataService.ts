const API_BASE_URL = 'https://pokeapi.co/api/v2';

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
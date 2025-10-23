export const API_CONFIG = {
  POKEMON_BASE:
    process.env.NEXT_PUBLIC_POKEMON_API_BASE || "https://pokeapi.co/api/v2",
  POKEMON_SPRITES_BASE:
    process.env.NEXT_PUBLIC_POKEMON_SPRITES_BASE ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
  TOTAL_POKEMON: parseInt(process.env.NEXT_PUBLIC_TOTAL_POKEMON || "898", 10),
} as const;

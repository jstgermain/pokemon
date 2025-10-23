import { Pokemon, PokemonSpecies } from "@/types/pokemon";
import { API_CONFIG } from "./client";

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`${API_CONFIG.POKEMON_BASE}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon with id ${id}`);
  }
  return response.json();
}

export async function fetchPokemonSpecies(id: number): Promise<PokemonSpecies> {
  const response = await fetch(
    `${API_CONFIG.POKEMON_BASE}/pokemon-species/${id}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species with id ${id}`);
  }
  return response.json();
}

export function getRandomPokemonIds(count: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * API_CONFIG.TOTAL_POKEMON) + 1);
  }
  return Array.from(ids);
}

export function getPokemonImageUrl(id: number): string {
  return `${API_CONFIG.POKEMON_SPRITES_BASE}/${id}.png`;
}

export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getGenderDisplay(genderRate: number): string {
  if (genderRate === -1) {
    return "Genderless";
  }
  const femalePercent = (genderRate / 8) * 100;
  const malePercent = 100 - femalePercent;
  return `Male: ${malePercent}% / Female: ${femalePercent}%`;
}

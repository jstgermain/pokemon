import { useState, useEffect } from "react";
import { Pokemon, PokemonSpecies } from "@/types/pokemon";
import { fetchPokemon, fetchPokemonSpecies } from "@/lib/api/pokemon";

export function usePokemonDetail(id: string | string[] | undefined) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      return;
    }

    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemonId = parseInt(id, 10);
        const [pokemonData, speciesData] = await Promise.all([
          fetchPokemon(pokemonId),
          fetchPokemonSpecies(pokemonId),
        ]);
        setPokemon(pokemonData);
        setSpecies(speciesData);
      } catch (err) {
        setError("Failed to load Pokemon details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  return {
    pokemon,
    species,
    loading,
    error,
  };
}

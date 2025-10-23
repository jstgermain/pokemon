import { useState, useEffect, useCallback } from "react";
import { SimplePokemon } from "@/types/pokemon";

export function usePokemonList(count: number = 6) {
  const [pokemon, setPokemon] = useState<SimplePokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/pokemon?count=${count}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Failed to load Pokemon. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return {
    pokemon,
    loading,
    error,
    refetch: fetchPokemon,
  };
}

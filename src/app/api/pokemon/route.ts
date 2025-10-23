import { NextResponse } from "next/server";
import {
  fetchPokemon,
  getRandomPokemonIds,
  getPokemonImageUrl,
} from "@/lib/pokemonApi";
import { SimplePokemon } from "@/types/pokemon";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countParam = searchParams.get("count");
  const count = countParam ? parseInt(countParam, 10) : 6;

  try {
    const randomIds = getRandomPokemonIds(count);
    const pokemonPromises = randomIds.map((id) => fetchPokemon(id));
    const pokemonData = await Promise.all(pokemonPromises);

    const simplifiedPokemon: SimplePokemon[] = pokemonData.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: getPokemonImageUrl(pokemon.id),
    }));

    return NextResponse.json(simplifiedPokemon);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }
}

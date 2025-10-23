"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { SimplePokemon } from "@/types/pokemon";
import { formatPokemonName } from "@/lib/pokemonApi";

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={pokemon.image}
        alt={pokemon.name}
        sx={{
          height: 200,
          objectFit: "contain",
          padding: 2,
          backgroundColor: "#f8f9fa",
        }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="h6" component="div" color="primary">
          {formatPokemonName(pokemon.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          #{pokemon.id.toString().padStart(3, "0")}
        </Typography>
      </CardContent>
    </Card>
  );
}

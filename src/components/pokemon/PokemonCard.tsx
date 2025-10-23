"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SimplePokemon } from "@/types/pokemon";
import { formatPokemonName } from "@/lib/pokemonApi";

interface PokemonCardProps {
  pokemon: SimplePokemon;
  priority?: boolean;
}

export default function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(`/pokemon/${pokemon.id}`);
    }
  };

  const pokemonName = formatPokemonName(pokemon.name);

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${pokemonName}, number ${pokemon.id}`}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "secondary.main",
          outlineOffset: "2px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          padding: 2,
          backgroundColor: "grey.50",
        }}
      >
        <Image
          src={pokemon.image}
          alt={`${pokemonName} sprite`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          priority={priority}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="h6" component="div" color="text.primary">
          {pokemonName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          #{pokemon.id.toString().padStart(3, "0")}
        </Typography>
      </CardContent>
    </Card>
  );
}

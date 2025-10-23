"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  formatPokemonName,
  getGenderDisplay,
  getPokemonImageUrl,
} from "@/lib/api/pokemon";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const { pokemon, species, loading, error } = usePokemonDetail(params.id);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error || !pokemon || !species) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Pokemon not found"}</Alert>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const description = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/")}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Card>
        <Grid container>
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={getPokemonImageUrl(pokemon.id)}
              alt={pokemon.name}
              sx={{
                height: "100%",
                minHeight: 400,
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
                p: 4,
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                {formatPokemonName(pokemon.name)}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{ mb: 3 }}
              >
                #{pokemon.id.toString().padStart(3, "0")}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {description?.replace(/\f/g, " ") ||
                    "No description available."}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Gender Distribution
                </Typography>
                <Typography variant="body1">
                  {getGenderDisplay(species.gender_rate)}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Types
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {pokemon.types.map((type) => (
                    <Chip
                      key={type.type.name}
                      label={formatPokemonName(type.type.name)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Abilities
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {pokemon.abilities.map((ability) => (
                    <Chip
                      key={ability.ability.name}
                      label={formatPokemonName(ability.ability.name)}
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Height
                  </Typography>
                  <Typography variant="h6">
                    {(pokemon.height / 10).toFixed(1)} m
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="h6">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

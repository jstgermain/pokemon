"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
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
          role="status"
          aria-live="polite"
          aria-label="Loading Pokemon details"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} aria-label="Loading" />
        </Box>
      </Container>
    );
  }

  if (error || !pokemon || !species) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" role="alert">
          {error || "Pokemon not found"}
        </Alert>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          aria-label="Return to Pokemon list"
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
        aria-label="Return to Pokemon list"
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Card component="article" aria-label={`Details for ${formatPokemonName(pokemon.name)}`}>
        <Grid container>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                minHeight: 400,
                backgroundColor: "grey.50",
                p: 4,
              }}
            >
              <Image
                src={getPokemonImageUrl(pokemon.id)}
                alt={`${formatPokemonName(pokemon.name)} official artwork`}
                fill
                sizes="(max-width: 960px) 100vw, 40vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
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

              <Box sx={{ mb: 3 }} component="section" aria-labelledby="description-heading">
                <Typography variant="h5" component="h2" id="description-heading" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {description?.replace(/\f/g, " ") ||
                    "No description available."}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }} component="section" aria-labelledby="gender-heading">
                <Typography variant="h5" component="h2" id="gender-heading" gutterBottom>
                  Gender Distribution
                </Typography>
                <Typography variant="body1">
                  {getGenderDisplay(species.gender_rate)}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }} component="section" aria-labelledby="types-heading">
                <Typography variant="h5" component="h2" id="types-heading" gutterBottom>
                  Types
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }} role="list" aria-label="Pokemon types">
                  {pokemon.types.map((type) => (
                    <Chip
                      key={type.type.name}
                      label={formatPokemonName(type.type.name)}
                      color="secondary"
                      role="listitem"
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }} component="section" aria-labelledby="abilities-heading">
                <Typography variant="h5" component="h2" id="abilities-heading" gutterBottom>
                  Abilities
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }} role="list" aria-label="Pokemon abilities">
                  {pokemon.abilities.map((ability) => (
                    <Chip
                      key={ability.ability.name}
                      label={formatPokemonName(ability.ability.name)}
                      variant="outlined"
                      color="secondary"
                      role="listitem"
                    />
                  ))}
                </Box>
              </Box>

              <Grid container spacing={2} component="section" aria-label="Physical characteristics">
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary" component="h3">
                    Height
                  </Typography>
                  <Typography variant="h6" aria-label={`Height: ${(pokemon.height / 10).toFixed(1)} meters`}>
                    {(pokemon.height / 10).toFixed(1)} m
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary" component="h3">
                    Weight
                  </Typography>
                  <Typography variant="h6" aria-label={`Weight: ${(pokemon.weight / 10).toFixed(1)} kilograms`}>
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

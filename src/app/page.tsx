"use client";

import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { usePokemonList } from "@/hooks/usePokemonList";

export default function Home() {
  const { pokemon, loading, error, refetch } = usePokemonList(6);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} component="main">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={refetch}
          disabled={loading}
          aria-label="Load new random Pokemon"
        >
          New Pokemon
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }} role="alert">
          {error}
        </Alert>
      )}

      {loading ? (
        <Box
          role="status"
          aria-live="polite"
          aria-label="Loading Pokemon"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} aria-label="Loading" />
        </Box>
      ) : (
        <Grid container spacing={3} component="section" aria-label="Pokemon list">
          {pokemon.map((p, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <PokemonCard pokemon={p} priority={index < 3} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

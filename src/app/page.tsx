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
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        >
          New Pokemon
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {loading ? (
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
      ) : (
        <Grid container spacing={3}>
          {pokemon.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <PokemonCard pokemon={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

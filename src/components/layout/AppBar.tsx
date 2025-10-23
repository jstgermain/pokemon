"use client";

import { AppBar as MuiAppBar, Toolbar, Box, Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <MuiAppBar
      position="static"
      elevation={0}
      component="nav"
      aria-label="Main navigation"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: (theme) => `3px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="button"
            onClick={handleLogoClick}
            aria-label="Go to home page"
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              py: 1.5,
              border: "none",
              background: "transparent",
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.main",
                outlineOffset: "4px",
                borderRadius: 1,
              },
            }}
          >
            <Image
              src="/assets/images/pokemon-logo.svg"
              alt="Pokemon Explorer"
              width={180}
              height={60}
              priority
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

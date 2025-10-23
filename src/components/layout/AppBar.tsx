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
      sx={{
        backgroundColor: "#FFFFFF",
        borderBottom: "3px solid #2A75BB",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            onClick={handleLogoClick}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              py: 1.5,
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Image
              src="/assets/images/pokemon-logo.svg"
              alt="Pokemon Logo"
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

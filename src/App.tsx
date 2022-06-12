import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { PaletteMode, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

function App() {
  const [theme, setTheme] = React.useState<PaletteMode>("dark");

  const currentTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const changeTheme = () => {
    if (currentTheme.palette.mode === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        <div className="App">
          <Container
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowY: "hidden",
            }}
            maxWidth={false}
            disableGutters={true}
            color="default"
          >
            <Box
              position="absolute"
              component="div"
              color="default"
              sx={{
                display: "flex",
              }}
            >
              <Navbar changeTheme={changeTheme}></Navbar>
            </Box>
            <Box
              component="div"
              color="default"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
                overflowY: "scroll",
                p: 1,
              }}
            >
              <DrawerHeader></DrawerHeader>
              <Typography variant="h3" color="initial">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem molestiae expedita autem consectetur,
                voluptatibus corrupti accusamus eveniet earum nesciunt quisquam officia ullam suscipit enim perferendis
                maiores, eos molestias optio?
              </Typography>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

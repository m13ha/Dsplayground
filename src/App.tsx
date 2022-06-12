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


  const [theme, setTheme] = useState<PaletteMode>(() => {
    let dsplayground = localStorage.getItem("dsplaygroundThemeMode");

    if (dsplayground) {
      let localTheme = dsplayground

      if (localTheme === "light") {
        return("light");
      } else {
        return("dark");
      }
    }

    localStorage.setItem("dsplaygroundThemeMode", "dark");
    return ("dark");
  });

  const currentTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const changeTheme = () => {
    if (currentTheme.palette.mode === "light") {
      setTheme("dark");
      localStorage.setItem("dsplaygroundThemeMode", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("dsplaygroundThemeMode", "light");
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
            <Navbar changeTheme={changeTheme}></Navbar>
            <Box
              component="main"
              color="default"
              sx={{
                flexWrap: "wrap",
                height: "100%",
                overflowY: "scroll",
                p: 3,
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

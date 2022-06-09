import "./App.css";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";
//import CircularProgress from "@mui/material/CircularProgress";
//import Box from "@mui/material/Box";
//import Stack from "@mui/material/Stack";

function App() {

  const [theme, setTheme] = React.useState<PaletteMode>("dark")

  const currentTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const changeTheme = () => {
    if(currentTheme.palette.mode === "light"){
      setTheme("dark");
    }else {
      setTheme("light");
    }
    
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="App">
        <Container
          sx={{ display: "flex" }}
          maxWidth={false}
          disableGutters={true}
        >
          <Navbar changeTheme={changeTheme}></Navbar>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

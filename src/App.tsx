import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import React, { useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LinkedList from "./pages/LinkedList";
import Stacks from "./pages/Stacks";
import Queues from "./pages/Queues";
import Trees from "./pages/Trees";
import Graphs from "./pages/Graphs";
import HashTables from "./pages/Hashtables";
import { CanvasContext } from "./context/CanvasContext";
import { StacksArray } from "./utils/interfaces";



function App() {
  const [canvasHeight, setCanvasHeight] = useState<number>()
  const [canvasWidth, setCanvasWidth] = useState<number>()
  const [stacksArray, setStacksArray] = useState<StacksArray>([])

  const providerValue = useMemo(() => ({ canvasHeight, canvasWidth, setCanvasHeight, setCanvasWidth, stacksArray, setStacksArray }), [canvasHeight, canvasWidth, setCanvasHeight, setCanvasWidth, stacksArray, setStacksArray]);

  const [theme, setTheme] = useState<PaletteMode>(() => {
    let dsplayground = localStorage.getItem("dsplaygroundThemeMode");

    if (dsplayground) {
      let localTheme = dsplayground

      if (localTheme === "light") {
        return ("light");
      } else {
        return ("dark");
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
      <CanvasContext.Provider value={providerValue}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline enableColorScheme />
          <div className="App">
            <Container
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                height: "100%"
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
                  p: 3,
                }}
              >
                <DrawerHeader></DrawerHeader>
                <Routes>
                  <Route path="/" element={<Stacks />} />
                  <Route path="/queues" element={<Queues />} />
                  <Route path="/linkedlists" element={<LinkedList />} />
                  <Route path="/trees" element={<Trees />} />
                  <Route path="/graphs" element={<Graphs />} />
                  <Route path="/hashtables" element={<HashTables />} />
                </Routes>
              </Box>
            </Container>
          </div>
        </ThemeProvider>
      </CanvasContext.Provider>
    </Router>
  );
}

export default App;

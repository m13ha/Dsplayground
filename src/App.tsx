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
import LinkedList from "./pages/LinkedLists/LinkedList";
import Stacks from "./pages/Stacks/Stacks";
import Queues from "./pages/Queues/Queues";
import Trees from "./pages/Trees/Trees";
import Graphs from "./pages/Graphs/Graphs";
import HashTables from "./pages/Hashtable/Hashtables";
import { StackCanvasContext} from "./context/CanvasContext";
import QueueCanvasContext  from "./context/QueueContext"
import { StacksArray, QueueArray } from "./utils/interfaces";



function App() {
  // STACK MANAGEMENT STATES
  const [stackCanvasHeight, setStackCanvasHeight] = useState<number>()
  const [stackCanvasWidth, setStackCanvasWidth] = useState<number>()
  const [stacksArray, setStacksArray] = useState<StacksArray>([])

  const stackProviderValue = useMemo(() => ({ stackCanvasHeight, stackCanvasWidth, setStackCanvasHeight, setStackCanvasWidth, stacksArray, setStacksArray }), [stackCanvasHeight, stackCanvasWidth, setStackCanvasHeight, setStackCanvasWidth, stacksArray, setStacksArray]);


  // QUEUE MANAGEMENT STATE
  const [queueCanvasHeight, setQueueCanvasHeight] = useState<number>()
  const [queueCanvasWidth, setQueueCanvasWidth] = useState<number>()
  const [queueArray, setQueueArray] = useState<QueueArray>([])

  const queueProviderValue = useMemo(() => ({ queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray, setQueueArray }), [queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray, setQueueArray]);

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
      <QueueCanvasContext.Provider value={queueProviderValue}>
        <StackCanvasContext.Provider value={stackProviderValue}>
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
        </StackCanvasContext.Provider>
      </QueueCanvasContext.Provider>
    </Router>
  );
}

export default App;

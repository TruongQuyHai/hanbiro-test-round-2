import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material";
import Routers from "routers";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

function App() {
  const isAuthenticated = true; // api later

  return (
    <>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <BrowserRouter>{isAuthenticated && <Routers />}</BrowserRouter>
      </StyledEngineProvider>
    </>
  );
}

export default App;


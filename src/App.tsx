import { Container } from "@mui/material";
import Navbar from "./components/layout/Navbar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;

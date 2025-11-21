import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./App.css";
import PersonsPage from "./pages/PersonPage";
import VaccinationRecordPage from "./pages/VaccinationRecordPage";
import VaccinesPage from "./pages/VaccinePage";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Vaccination Manager</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ p: 5 }}>
        <Grid size={12}>
          <VaccinationRecordPage />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PersonsPage />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <VaccinesPage />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

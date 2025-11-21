import VaccineIcons from "@mui/icons-material/Medication";
import PersonIcons from "@mui/icons-material/People";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const currentTab = location.pathname.startsWith("/vaccines") ? 1 : 0;

  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vaccination Manager
          </Typography>
        </Toolbar>

        <Box sx={{ bgcolor: "primary.dark" }}>
          <Container maxWidth="lg">
            <Tabs
              value={currentTab}
              textColor="inherit"
              indicatorColor="secondary"
              variant="fullWidth"
              aria-label="navigation tabs"
            >
              <Tab
                icon={<PersonIcons />}
                label="Pessoas & Cartão"
                component={Link}
                to="/persons"
              />
              <Tab
                icon={<VaccineIcons />}
                label="Gerenciar Vacinas"
                component={Link}
                to="/vaccines"
              />
            </Tabs>
          </Container>
        </Box>
      </AppBar>
    </>
  );
}

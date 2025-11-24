import LogoutIcon from "@mui/icons-material/Logout";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { LanguageSwitcher } from "../common/LanguageSwitcher";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const { texts } = useLanguage();

  const tabValue = pathname.startsWith("/vaccines") ? 1 : 0;

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vaccination Manager
          </Typography>

          <LanguageSwitcher />

          {isAuthenticated && (
            <Tooltip title={texts.nav.logout}>
              <IconButton color="inherit" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>

        {isAuthenticated && (
          <Box sx={{ bgcolor: "primary.dark" }}>
            <Container maxWidth="lg">
              <Tabs
                value={tabValue}
                textColor="inherit"
                indicatorColor="secondary"
                variant="fullWidth"
              >
                <Tab
                  icon={<PeopleIcon />}
                  label={texts.nav.patients}
                  component={Link}
                  to="/persons"
                />
                <Tab
                  icon={<MedicationIcon />}
                  label={texts.nav.vaccines}
                  component={Link}
                  to="/vaccines"
                />
              </Tabs>
            </Container>
          </Box>
        )}
      </AppBar>
    </>
  );
}

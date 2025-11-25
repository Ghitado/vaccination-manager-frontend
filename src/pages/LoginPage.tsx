import { Grid, Paper } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const SIDE_IMAGE = "/images/login-bg.png";

export default function LoginPage() {
  return (
    <Grid container>
      <Grid
        component={Paper}
        elevation={6}
        size={{ xs: false, sm: 4, md: 7 }}
        sx={{
          backgroundImage: `url(${SIDE_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        size={{ xs: 12, sm: 8, md: 5 }}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
}

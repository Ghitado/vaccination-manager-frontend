import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function LoginForm() {
  const { texts } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showFeedback } = useFeedback();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!email.trim() || !password.trim()) {
      setEmailError(!email.trim());
      setPasswordError(!password.trim());
      setApiError(texts.auth.feedback.required);
      return;
    }

    if (isRegister && !passwordRegex.test(password)) {
      setPasswordError(true);
      setApiError(texts.auth.feedback.passwordWeak);
      showFeedback(texts.auth.feedback.passwordWeak, "warning");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await authApi.register(email, password);
        showFeedback(texts.auth.feedback.created, "success");
        setIsRegister(false);
        setEmail("");
        setPassword("");
      } else {
        await authApi.login(email, password);
        login();
        showFeedback(texts.auth.feedback.welcome, "success");
        navigate("/persons");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let msg = texts.auth.feedback.server;

      if (isRegister && err.response?.data) {
        const errorData = JSON.stringify(err.response.data);
        if (
          errorData.includes("exists") ||
          errorData.includes("Duplicate") ||
          errorData.includes("taken")
        ) {
          msg = texts.auth.feedback.emailExists;
        }
      }

      if (!isRegister && err.response?.status === 401) {
        msg = texts.auth.feedback.invalid;
      }

      setApiError(msg);
      showFeedback(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
        {isRegister ? texts.auth.registerTitle : texts.auth.loginTitle}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {isRegister ? texts.auth.registerSubtitle : texts.auth.loginSubtitle}
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            autoFocus
            label={texts.auth.email}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            error={emailError}
          />

          <TextField
            fullWidth
            label={texts.auth.password}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            error={passwordError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5 }}
            disabled={loading}
          >
            {loading
              ? texts.auth.loading
              : isRegister
              ? texts.auth.registerButton
              : texts.auth.loginButton}
          </Button>
        </Stack>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            onClick={() => {
              setIsRegister(!isRegister);
              setApiError("");
              setEmailError(false);
              setPasswordError(false);
            }}
            sx={{ textTransform: "none" }}
          >
            {isRegister
              ? texts.auth.switchToLogin
              : texts.auth.switchToRegister}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

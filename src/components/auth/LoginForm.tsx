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

export default function LoginForm() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!email.trim() || !password.trim()) {
      setEmailError(!email.trim());
      setPasswordError(!password.trim());
      setApiError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await authApi.register(email, password);
        showFeedback("Conta criada! Faça login.", "success");
        setIsRegister(false);
        setEmail("");
        setPassword("");
      } else {
        await authApi.login(email, password);
        login();
        showFeedback("Bem-vindo!", "success");
        navigate("/persons");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg =
        err.response?.status === 401
          ? "E-mail ou senha incorretos."
          : "Erro ao conectar com o servidor.";

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
        {isRegister ? "Criar Conta" : "Bem-vindo"}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {isRegister
          ? "Preencha os dados para começar"
          : "Insira suas credenciais para continuar"}
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
            required
            fullWidth
            autoFocus
            label="E-mail"
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
            required
            fullWidth
            label="Senha"
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
            {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
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
              ? "Já tem uma conta? Login"
              : "Não tem conta? Cadastre-se"}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ServerWakeUpModal = () => {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [hasFailed, setHasFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const { texts } = useLanguage();
  const baseUrl = import.meta.env.VITE_API_URL;
  const stopLoopRef = useRef(false);
  const tryConnect = async (timeoutMs: number) => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      await fetch(`${baseUrl}/api/person?pageNumber=1&pageSize=1`, {
        signal: controller.signal,
      });
      clearTimeout(id);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;
    stopLoopRef.current = false;

    setHasFailed(false);
    setTimeLeft(120);

    const startPolling = async () => {
      if (await tryConnect(2000)) return;

      if (mounted) setOpen(true);

      while (mounted && !stopLoopRef.current) {
        const isOnline = await tryConnect(5000);

        if (isOnline && mounted) {
          setOpen(false);
          window.location.reload();
          return;
        }
        await wait(30000);
      }
    };

    startPolling();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setHasFailed(true);
          stopLoopRef.current = true;
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      mounted = false;
      stopLoopRef.current = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, retryKey]);

  if (!open) return null;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      PaperProps={{ sx: { borderRadius: 3, p: 1, minWidth: 320 } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 0 }}>
        {hasFailed
          ? texts.common.serverWakeUp.timeoutTitle
          : texts.common.serverWakeUp.title}
      </DialogTitle>

      <DialogContent>
        <Stack alignItems="center" spacing={3} sx={{ py: 3 }}>
          {hasFailed ? (
            <>
              <Typography variant="body1" textAlign="center" color="error">
                {texts.common.serverWakeUp.timeoutMessage}
              </Typography>
              <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
              <Button
                variant="contained"
                onClick={() => setRetryKey((k) => k + 1)}
                fullWidth
              >
                {texts.common.serverWakeUp.retry}
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
              >
                {texts.common.serverWakeUp.message}
              </Typography>

              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress size={80} thickness={2} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    {timeLeft}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Typography variant="body2" fontWeight="bold">
                  {texts.common.serverWakeUp.wait} {timeLeft}
                  {texts.common.serverWakeUp.seconds}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((120 - timeLeft) / 120) * 100}
                  sx={{ mt: 1, borderRadius: 5, height: 8 }}
                />
              </Box>

              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {texts.common.serverWakeUp.status}
              </Typography>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

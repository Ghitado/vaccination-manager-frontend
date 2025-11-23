import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useContext, useState, type ReactNode } from "react";

interface FeedbackContextType {
  showFeedback: (message: string, severity?: AlertColor) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showFeedback = (message: string, severity: AlertColor = "success") => {
    setSnack({ open: true, message, severity });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (_?: any, reason?: string) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <FeedbackContext.Provider value={{ showFeedback }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context)
    throw new Error("useFeedback must be used within FeedbackProvider");
  return context;
};

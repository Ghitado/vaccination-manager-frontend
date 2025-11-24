import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ServerWakeUpModal } from "./components/common/ServerWakeUpModal.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FeedbackProvider>
        <LanguageProvider>
          <AuthProvider>
            <ServerWakeUpModal />
            <App />
          </AuthProvider>
        </LanguageProvider>
      </FeedbackProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PersonPage from "../pages/PersonPage";
import VaccinePage from "../pages/VaccinePage";
import ProtectedRoute from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/persons" replace />} />

        <Route path="/persons" element={<PersonPage />} />
        <Route path="/vaccines" element={<VaccinePage />} />
      </Route>

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import PersonPage from "../pages/PersonPage";
import VaccinePage from "../pages/VaccinePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/persons" replace />} />

      <Route path="/persons" element={<PersonPage />} />
      <Route path="/vaccines" element={<VaccinePage />} />

      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

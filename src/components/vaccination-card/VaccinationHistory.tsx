import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { VaccinationRecordResponse } from "../../api/vaccinationRecord";

type Props = {
  records: VaccinationRecordResponse[];
  onDelete: (id: string) => void;
};

export default function VaccinationHistory({ records, onDelete }: Props) {
  if (!records || records.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
      >
        Nenhum registro encontrado.
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#eee" }}>
            <TableCell>Vacina</TableCell>
            <TableCell>Detalhes</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((rec) => (
            <TableRow key={rec.id} hover>
              <TableCell sx={{ color: "primary.main" }}>
                {rec.vaccineName}
              </TableCell>
              <TableCell>
                {new Date(rec.appliedAt).toLocaleDateString("pt-BR")} •{" "}
                {rec.dose}ª Dose
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(rec.id)}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

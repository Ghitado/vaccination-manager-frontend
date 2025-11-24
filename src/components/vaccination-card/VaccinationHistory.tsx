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
import { useLanguage } from "../../contexts/LanguageContext";

type Props = {
  records: VaccinationRecordResponse[];
  onDelete: (id: string) => void;
};

export default function VaccinationHistory({ records, onDelete }: Props) {
  const { texts, language } = useLanguage();

  if (!records || records.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
      >
        {texts.vaccinationCard.history.empty}
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#eee" }}>
            <TableCell>{texts.vaccinationCard.history.table.vaccine}</TableCell>
            <TableCell>{texts.vaccinationCard.history.table.details}</TableCell>
            <TableCell align="right">
              {texts.vaccinationCard.history.table.actions}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((rec) => (
            <TableRow key={rec.id} hover>
              <TableCell sx={{ color: "primary.main" }}>
                {rec.vaccineName}
              </TableCell>
              <TableCell>
                {new Date(rec.appliedAt).toLocaleDateString(
                  language === "pt" ? "pt-BR" : "en-US"
                )}{" "}
                •{" "}
                {language === "pt"
                  ? `${rec.dose}ª ${texts.vaccinationCard.history.dose}`
                  : `${texts.vaccinationCard.history.dose} ${rec.dose}`}
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(rec.id)}
                >
                  {texts.vaccinationCard.history.remove}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPersonByIdApi, type PersonResponse } from "../../api/person";
import {
  createVaccinationRecordApi,
  deleteVaccinationRecordApi,
} from "../../api/vaccinationRecord";
import ScrollableText from "../ScrollableText";
import VaccinationForm from "./VaccinationForm";
import VaccinationHistory from "./VaccinationHistory";

type Props = {
  personId: string | null;
  open: boolean;
  vaccineOptions: { id: string; name: string }[];
  onClose: () => void;
};

export default function VaccinationCardModal({
  personId,
  open,
  vaccineOptions,
  onClose,
}: Props) {
  const [person, setPerson] = useState<PersonResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && personId) {
      const load = () => {
        setLoading(true);
        getPersonByIdApi(personId)
          .then(setPerson)
          .finally(() => setLoading(false));
      };
      load();
    } else {
      (async () => {
        setPerson(null);
      })();
    }
  }, [open, personId]);

  const handleAdd = async (vaccineId: string, date: string, dose: number) => {
    if (!person) return;
    setSaving(true);
    return createVaccinationRecordApi({
      personId: person.id,
      vaccineId,
      appliedAt: date,
      dose,
    })
      .then(() => getPersonByIdApi(person.id).then(setPerson))
      .finally(() => setSaving(false));
  };

  const handleDelete = (recordId: string) => {
    if (!person || !confirm("Remover registro?")) return;
    deleteVaccinationRecordApi(recordId).then(() =>
      getPersonByIdApi(person.id).then(setPerson)
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">Cartão de Vacinação</Typography>
        <Typography variant="subtitle1" color="primary">
          <ScrollableText maxWidth="80%">
            {person?.name || "..."}
          </ScrollableText>
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "#f9f9f9" }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Registrar Vacina
          </Typography>
          <VaccinationForm
            vaccineOptions={vaccineOptions}
            onAdd={handleAdd}
            loading={saving}
          />
        </Paper>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Histórico
        </Typography>

        {loading ? (
          <Stack alignItems="center" p={3}>
            <CircularProgress />
          </Stack>
        ) : (
          <VaccinationHistory
            records={person?.vaccinationRecords || []}
            onDelete={handleDelete}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

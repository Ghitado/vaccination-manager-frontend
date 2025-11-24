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
import { useLanguage } from "../../contexts/LanguageContext";

import { getPersonByIdApi, type PersonResponse } from "../../api/person";
import {
  createVaccinationRecordApi,
  deleteVaccinationRecordApi,
} from "../../api/vaccinationRecord";
import { useFeedback } from "../../contexts/FeedbackContext";
import CustomPagination from "../CustomPagination";
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
  const { texts } = useLanguage();

  const [person, setPerson] = useState<PersonResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showFeedback } = useFeedback();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (open && personId) {
      setLoading(true);
      getPersonByIdApi(personId)
        .then(setPerson)
        .catch(() =>
          showFeedback(texts.vaccinationCard.feedback.loadError, "error")
        )
        .finally(() => setLoading(false));

      setPage(1);
    } else {
      setPerson(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, personId]);

  const refresh = () => getPersonByIdApi(person!.id).then(setPerson);

  const handleAdd = async (vaccineId: string, date: string, dose: number) => {
    setSaving(true);
    createVaccinationRecordApi({
      personId: person!.id,
      vaccineId,
      appliedAt: date,
      dose,
    })
      .then(() => {
        refresh();
        showFeedback(texts.vaccinationCard.feedback.successRegister, "success");
      })
      .catch(() =>
        showFeedback(texts.vaccinationCard.feedback.errorRegister, "error")
      )
      .finally(() => setSaving(false));
  };

  const handleDelete = (recordId: string) => {
    if (!confirm(texts.vaccinationCard.main.confirmDelete)) return;
    deleteVaccinationRecordApi(recordId)
      .then(() => {
        refresh();
        showFeedback(texts.vaccinationCard.feedback.successDelete, "success");
      })
      .catch(() =>
        showFeedback(texts.vaccinationCard.feedback.errorDelete, "error")
      );
  };

  const allRecords = person?.vaccinationRecords || [];
  const totalPages = Math.ceil(allRecords.length / pageSize) || 1;
  const paginatedRecords = allRecords.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{texts.vaccinationCard.main.title}</Typography>
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
            {texts.vaccinationCard.main.registerTitle}
          </Typography>
          <VaccinationForm
            vaccineOptions={vaccineOptions}
            onAdd={handleAdd}
            loading={saving}
          />
        </Paper>

        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {texts.vaccinationCard.main.historyTitle}
        </Typography>

        {loading ? (
          <Stack alignItems="center" p={3}>
            <CircularProgress />
          </Stack>
        ) : (
          <>
            <VaccinationHistory
              records={paginatedRecords}
              onDelete={handleDelete}
            />

            {allRecords.length > 0 && (
              <CustomPagination
                page={page}
                totalPages={totalPages}
                pageSize={pageSize}
                onChangePage={setPage}
                onPageSizeChange={setPageSize}
              />
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{texts.vaccinationCard.main.close}</Button>
      </DialogActions>
    </Dialog>
  );
}

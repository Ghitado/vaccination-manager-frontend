import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  createVaccinationRecordApi,
  type CreateVaccinationRecordRequest,
} from "../api/vaccinationRecord";

export default function VaccinationRecordPage() {
  const [personId, setPersonId] = useState("");
  const [vaccineId, setVaccineId] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [dose, setDose] = useState(1);

  async function handleCreate() {
    if (!personId || !vaccineId || !appliedAt || !dose) return;

    const data: CreateVaccinationRecordRequest = {
      personId,
      vaccineId,
      appliedAt,
      dose: Number(dose),
    };

    await createVaccinationRecordApi(data);

    setPersonId("");
    setVaccineId("");
    setAppliedAt("");
    setDose(1);
  }

  return (
    <Stack sx={{ width: "100%", p: 2 }} alignItems="center">
      <Paper
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Vaccination Records
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label="Person ID"
              size="small"
              variant="filled"
              value={personId}
              onChange={(e) => setPersonId(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              label="Vaccine ID"
              size="small"
              variant="filled"
              value={vaccineId}
              onChange={(e) => setVaccineId(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label="Date"
              type="date"
              size="small"
              variant="filled"
              value={appliedAt}
              onChange={(e) => setAppliedAt(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              label="Dose"
              type="number"
              size="small"
              variant="filled"
              value={dose}
              onChange={(e) => setDose(Number(e.target.value))}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 2 }}>
            <Button
              variant="contained"
              onClick={handleCreate}
              fullWidth
              size="large"
              sx={{ height: "100%" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

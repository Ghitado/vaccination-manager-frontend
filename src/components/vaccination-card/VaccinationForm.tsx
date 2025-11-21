import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  vaccineOptions: { id: string; name: string }[];
  onAdd: (vaccineId: string, date: string, dose: number) => Promise<void>;
  loading: boolean;
};

export default function VaccinationForm({
  vaccineOptions,
  onAdd,
  loading,
}: Props) {
  const [vaccineId, setVaccineId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [dose, setDose] = useState(1);

  const handleSubmit = () => {
    if (!vaccineId || !date || !dose) return;
    onAdd(vaccineId, date, Number(dose)).then(() => {
      setVaccineId(null);
      setDose((d) => d + 1);
    });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, sm: 4 }}>
        <Autocomplete
          options={vaccineOptions}
          getOptionLabel={(o) => o.name}
          value={vaccineOptions.find((v) => v.id === vaccineId) || null}
          onChange={(_, v) => setVaccineId(v?.id || null)}
          renderInput={(params) => (
            <TextField {...params} label="Vacina" size="small" />
          )}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField
          type="date"
          size="small"
          fullWidth
          label="Data"
          slotProps={{ inputLabel: { shrink: true } }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 2 }}>
        <TextField
          type="number"
          size="small"
          fullWidth
          label="Dose"
          value={dose}
          onChange={(e) => setDose(Number(e.target.value))}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSubmit}
          loading={loading}
        >
          Aplicar
        </Button>
      </Grid>
    </Grid>
  );
}

import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

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
  const { texts } = useLanguage();

  const [vaccineId, setVaccineId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [dose, setDose] = useState(1);

  const [errors, setErrors] = useState({
    vaccineId: false,
    date: false,
    dose: false,
  });

  const handleSubmit = async () => {
    const isVaccineInvalid = !vaccineId;
    const isDateInvalid = !date;
    const isDoseInvalid = !dose || Number(dose) <= 0;

    if (isVaccineInvalid || isDateInvalid || isDoseInvalid) {
      setErrors({
        vaccineId: isVaccineInvalid,
        date: isDateInvalid,
        dose: isDoseInvalid,
      });
      return;
    }

    await onAdd(vaccineId!, date, Number(dose));

    setVaccineId(null);
    setDose((d) => d + 1);
    setErrors({ vaccineId: false, date: false, dose: false });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, sm: 4 }}>
        <Autocomplete
          options={vaccineOptions}
          getOptionLabel={(o) => o.name}
          value={vaccineOptions.find((v) => v.id === vaccineId) || null}
          onChange={(_, v) => {
            setVaccineId(v?.id || null);
            setErrors((prev) => ({ ...prev, vaccineId: false }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={texts.vaccinationCard.form.vaccineLabel}
              size="small"
              error={errors.vaccineId}
              helperText={
                errors.vaccineId ? texts.vaccinationCard.form.required : ""
              }
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField
          type="date"
          size="small"
          fullWidth
          label={texts.vaccinationCard.form.dateLabel}
          slotProps={{ inputLabel: { shrink: true } }}
          inputProps={{
            max: new Date().toISOString().split("T")[0],
          }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setErrors((prev) => ({ ...prev, date: false }));
          }}
          error={errors.date}
          helperText={errors.date ? texts.vaccinationCard.form.required : ""}
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 2 }}>
        <TextField
          type="number"
          size="small"
          fullWidth
          label={texts.vaccinationCard.form.doseLabel}
          value={dose}
          onChange={(e) => {
            setDose(Number(e.target.value));
            setErrors((prev) => ({ ...prev, dose: false }));
          }}
          error={errors.dose}
          helperText={errors.dose ? texts.vaccinationCard.form.invalidDose : ""}
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
          {texts.vaccinationCard.form.submit}
        </Button>
      </Grid>
    </Grid>
  );
}

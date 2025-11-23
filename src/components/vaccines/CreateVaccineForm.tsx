import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface CreateVaccineFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function CreateVaccineForm({
  onCreate,
}: CreateVaccineFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);
    await onCreate(name)
      .then(() => setName(""))
      .finally(() => setLoading(false));
  }

  return (
    <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit}>
      <TextField
        label="Nome da Vacina"
        variant="filled"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !name.trim()}
      >
        Adicionar
      </Button>
    </Stack>
  );
}

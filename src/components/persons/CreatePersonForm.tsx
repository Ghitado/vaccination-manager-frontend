import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CreatePersonFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function CreatePersonForm({ onCreate }: CreatePersonFormProps) {
  const { texts } = useLanguage();

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
        label={texts.persons.form.nameLabel}
        variant="filled"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !name.trim()}
      >
        {texts.persons.form.submit}
      </Button>
    </Stack>
  );
}

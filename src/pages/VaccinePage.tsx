import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  createVaccineApi,
  getVaccinesApi,
  type VaccineResponse,
} from "../api/vaccine";
import CustomPagination from "../components/CustomPagination";
import VaccineTable from "../components/vaccines/VaccineTable";

export default function VaccinePage() {
  const [vaccines, setVaccines] = useState<VaccineResponse[]>([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const reload = async (p = page) => {
    const res = await getVaccinesApi(p, pageSize);
    setVaccines(res.items);
    setTotalPages(Math.ceil(res.totalCount / res.pageSize));
  };

  useEffect(() => {
    (async () => {
      reload();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const handleCreate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    await createVaccineApi({ name })
      .then(() => {
        setName("");
        reload(page);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Gerenciar Vacinas</Typography>

        <Stack
          component="form"
          direction="row"
          spacing={2}
          onSubmit={handleCreate}
        >
          <TextField
            label="Nome da Vacina"
            variant="filled"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            Adicionar
          </Button>
        </Stack>

        <VaccineTable vaccines={vaccines} />

        <CustomPagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onChangePage={setPage}
          onPageSizeChange={setPageSize}
        />
      </Stack>
    </Paper>
  );
}

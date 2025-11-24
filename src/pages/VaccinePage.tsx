import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import {
  createVaccineApi,
  getVaccinesApi,
  type VaccineResponse,
} from "../api/vaccine";
import CustomPagination from "../components/CustomPagination";
import CreateVaccineForm from "../components/vaccines/CreateVaccineForm";
import VaccineTable from "../components/vaccines/VaccineTable";
import { useFeedback } from "../contexts/FeedbackContext";

export default function VaccinePage() {
  const { texts } = useLanguage();

  const [allVaccines, setAllVaccines] = useState<VaccineResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { showFeedback } = useFeedback();

  const execute = async (action: () => Promise<void>, errorMsg: string) => {
    try {
      await action();
    } catch (e) {
      console.error(e);
      showFeedback(errorMsg, "error");
    }
  };

  const reload = () =>
    execute(async () => {
      const res = await getVaccinesApi(1, 100);
      setAllVaccines(res.items);
    }, texts.vaccines.feedback.loadError);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = allVaccines.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  useEffect(() => {
    (async () => {
      setPage(1);
    })();
  }, [search, pageSize]);

  const handleCreate = (name: string) =>
    execute(async () => {
      await createVaccineApi({ name });
      showFeedback(texts.vaccines.feedback.created, "success");
      reload();
    }, texts.vaccines.feedback.createError);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">{texts.vaccines.title}</Typography>

          <TextField
            placeholder={texts.vaccines.search}
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
        </Stack>

        <CreateVaccineForm onCreate={handleCreate} />
        <VaccineTable vaccines={paginated} />

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

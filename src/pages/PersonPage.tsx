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
  createPersonApi,
  deletePersonByIdApi,
  getPaginatedPersonsApi,
  type PaginatedPersonResponse,
} from "../api/person";
import { getVaccinesApi } from "../api/vaccine";

import CustomPagination from "../components/common/CustomPagination";
import CreatePersonForm from "../components/persons/CreatePersonForm";
import PersonTable from "../components/persons/PersonTable";
import VaccinationCardModal from "../components/vaccination-card/VaccinationCardModal";
import { useFeedback } from "../contexts/FeedbackContext";

export default function PersonPage() {
  const { texts } = useLanguage();

  const [persons, setPersons] = useState<PaginatedPersonResponse[]>([]);
  const [vaccineOptions, setVaccineOptions] = useState<
    { id: string; name: string }[]
  >([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
      const [pRes, vRes] = await Promise.all([
        getPaginatedPersonsApi(1, 100),
        getVaccinesApi(1, 100),
      ]);
      setPersons(pRes.items);
      setVaccineOptions(vRes.items);
    }, texts.persons.feedback.errorLoad);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
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
      await createPersonApi({ name });
      showFeedback(texts.persons.feedback.created, "success");
      reload();
    }, texts.persons.feedback.errorCreate);

  const handleDelete = (id: string) => {
    if (!confirm(texts.persons.feedback.confirmDelete)) return;
    execute(async () => {
      await deletePersonByIdApi(id);
      showFeedback(texts.persons.feedback.deleted, "success");
      reload();
    }, texts.persons.feedback.errorDelete);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">{texts.persons.title}</Typography>

          <TextField
            placeholder={texts.persons.search}
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

        <CreatePersonForm onCreate={handleCreate} />

        <PersonTable
          persons={paginated}
          onDelete={handleDelete}
          onOpenCard={setSelectedId}
        />

        <CustomPagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onChangePage={setPage}
          onPageSizeChange={setPageSize}
        />
      </Stack>

      <VaccinationCardModal
        open={!!selectedId}
        personId={selectedId}
        vaccineOptions={vaccineOptions}
        onClose={() => setSelectedId(null)}
      />
    </Paper>
  );
}

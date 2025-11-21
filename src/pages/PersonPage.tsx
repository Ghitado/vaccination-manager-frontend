import { Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {
  createPersonApi,
  deletePersonByIdApi,
  getPaginatedPersonsApi,
  type PaginatedPersonResponse,
} from "../api/person";
import { getVaccinesApi } from "../api/vaccine";

import CustomPagination from "../components/CustomPagination";
import CreatePersonForm from "../components/persons/CreatePersonForm";
import PersonTable from "../components/persons/PersonTable";
import VaccinationCardModal from "../components/vaccination-card/VaccinationCardModal";

export default function PersonPage() {
  const [persons, setPersons] = useState<PaginatedPersonResponse[]>([]);
  const [vaccineOptions, setVaccineOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function reload(p = page) {
    const [pRes, vRes] = await Promise.all([
      getPaginatedPersonsApi(p, pageSize),
      getVaccinesApi(1, 100),
    ]);

    setPersons(pRes.items);
    setTotalPages(Math.ceil(pRes.totalCount / pRes.pageSize));
    setVaccineOptions(vRes.items);
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  async function handleCreate(name: string) {
    await createPersonApi({ name });
    reload(page);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza? Isso apagará o histórico desta pessoa.")) return;
    await deletePersonByIdApi(id);
    reload(page);
  }

  const handleOpenCard = (id: string) => {
    setSelectedPersonId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPersonId(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Gerenciar Pessoas</Typography>

        <CreatePersonForm onCreate={handleCreate} />

        <PersonTable
          persons={persons}
          onDelete={handleDelete}
          onOpenCard={handleOpenCard}
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
        open={isModalOpen}
        personId={selectedPersonId}
        vaccineOptions={vaccineOptions}
        onClose={handleCloseModal}
      />
    </Paper>
  );
}

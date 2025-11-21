import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createPersonApi,
  deletePersonByIdApi,
  getPaginatedPersonsApi,
  getPersonByIdApi,
  type PaginatedPersonResponse,
  type PersonResponse,
} from "../api/person";
import CopyButton from "../components/CopyButton";
import ScrollableText from "../components/ScrollableText";

export default function PersonPage() {
  const [persons, setPersons] = useState<PaginatedPersonResponse[]>([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonResponse | null>(
    null
  );

  async function reload(p = page) {
    const res = await getPaginatedPersonsApi(p, pageSize);
    setPersons(res.items);
    setTotalPages(Math.ceil(res.totalCount / res.pageSize));
  }

  useEffect(() => {
    (async () => {
      reload();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  async function handleCreate() {
    if (!name.trim()) return;
    await createPersonApi({ name });
    setName("");
    reload(page);
  }

  async function handleDelete(id: string) {
    await deletePersonByIdApi(id);
    reload(page);
  }

  async function handleOpenCard(id: string) {
    setIsLoadingDetails(true);
    setOpenModal(true);
    try {
      const data = await getPersonByIdApi(id);
      setSelectedPerson(data);
    } catch (error) {
      console.error("Error trying on load the data.", error);
      setOpenModal(false);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPerson(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Persons</Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Name"
            variant="filled"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleCreate}>
            Add
          </Button>
        </Stack>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ maxHeight: 440 }}
        >
          <Table
            stickyHeader
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                borderLeft: "1px solid rgba(224, 224, 224, 1)",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ xs: { width: 120 } }}>ID</TableCell>
                <TableCell sx={{ xs: { width: 240 } }}>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {persons.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CopyButton text={p.id} />
                      <ScrollableText maxWidth={100}>{p.id}</ScrollableText>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <ScrollableText maxWidth={230}>{p.name}</ScrollableText>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={() => handleOpenCard(p.id)}
                      >
                        See
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>

        <Button
          size="small"
          onClick={() => setPageSize(pageSize === 5 ? 10 : 5)}
        >
          PageSize: {pageSize}
        </Button>
      </Stack>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isLoadingDetails
            ? "Loading..."
            : `Vaccination Card: ${selectedPerson?.name}`}
        </DialogTitle>

        <DialogContent dividers>
          {isLoadingDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : selectedPerson ? (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>VaccineId</TableCell>
                    <TableCell>VaccineName</TableCell>
                    <TableCell>AppliedAt</TableCell>
                    <TableCell>Dose</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPerson.vaccinationRecords?.length > 0 ? (
                    selectedPerson.vaccinationRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id || "Unknown Vaccine"}</TableCell>
                        <TableCell>
                          {record.vaccineId || "Unknown Vaccine"}
                        </TableCell>
                        <TableCell>
                          {record.vaccineName || "Unknown Vaccine"}
                        </TableCell>
                        <TableCell>
                          {new Date(record.appliedAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>{record.dose}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        There are no vaccine records yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="error">
              Error while fetching the data.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

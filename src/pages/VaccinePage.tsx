import {
  Button,
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
  createVaccineApi,
  getVaccinesApi,
  type VaccineResponse,
} from "../api/vaccine";
import CopyButton from "../components/CopyButton";
import ScrollableText from "../components/ScrollableText";

export default function VaccinePage() {
  const [vaccines, setVaccines] = useState<VaccineResponse[]>([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [totalPages, setTotalPages] = useState(1);

  async function reload(p = page) {
    const res = await getVaccinesApi(p, pageSize);
    setVaccines(res.items);
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
    await createVaccineApi({ name });
    setName("");
    reload(page);
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "100%", minHeight: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Vaccines</Typography>

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
                <TableCell sx={{ width: 120 }}>ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {vaccines.map((p) => (
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
    </Paper>
  );
}

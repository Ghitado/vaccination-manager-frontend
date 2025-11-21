import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { PaginatedPersonResponse } from "../../api/person";
import ScrollableText from "../ScrollableText";

type PersonTableProps = {
  persons: PaginatedPersonResponse[];
  onDelete: (id: string) => void;
  onOpenCard: (id: string) => void;
};

export default function PersonTable({
  persons,
  onDelete,
  onOpenCard,
}: PersonTableProps) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ maxHeight: 300 }}
    >
      <Table
        stickyHeader
        size="small"
        sx={{ "& th, & td": { borderLeft: "1px solid #e0e0e0" } }}
      >
        <TableHead>
          <TableRow>
            <TableCell width={"100%"}>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {persons.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>
                <ScrollableText maxWidth={"50vh"}>{p.name}</ScrollableText>
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => onOpenCard(p.id)}
                  >
                    Ver Cartão
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(p.id)}
                  >
                    Excluir
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

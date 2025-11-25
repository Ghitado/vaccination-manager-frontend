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
import { useLanguage } from "../../contexts/LanguageContext";
import ScrollableText from "../common/ScrollableText";

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
  const { texts } = useLanguage();

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
            <TableCell width={"100%"}>{texts.persons.table.name}</TableCell>
            <TableCell>{texts.persons.table.actions}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {persons.length > 0 ? (
            persons.map((p) => (
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
                      {texts.persons.table.viewCard}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => onDelete(p.id)}
                    >
                      {texts.persons.table.delete}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" sx={{ py: 3, color: "text.secondary" }}>
                {texts.persons.table.empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

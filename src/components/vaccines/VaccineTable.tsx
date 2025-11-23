import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { VaccineResponse } from "../../api/vaccine";
import ScrollableText from "../ScrollableText";

export default function VaccineTable({
  vaccines,
}: {
  vaccines: VaccineResponse[];
}) {
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
            <TableCell sx={{ width: "100%" }}>Nome da Vacina</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccines.length > 0 ? (
            vaccines.map((v) => (
              <TableRow key={v.id} hover>
                <TableCell>
                  <ScrollableText maxWidth="100%">
                    <ScrollableText maxWidth={"50vh"}>{v.name}</ScrollableText>
                  </ScrollableText>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" sx={{ py: 3, color: "text.secondary" }}>
                Nenhuma vacina cadastrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

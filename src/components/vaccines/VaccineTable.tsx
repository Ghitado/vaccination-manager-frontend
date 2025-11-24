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
import { useLanguage } from "../../contexts/LanguageContext";
import ScrollableText from "../ScrollableText";

export default function VaccineTable({
  vaccines,
}: {
  vaccines: VaccineResponse[];
}) {
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
            <TableCell sx={{ width: "100%" }}>
              {texts.vaccines.table.name}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccines.length > 0 ? (
            vaccines.map((v) => (
              <TableRow key={v.id} hover>
                <TableCell>
                  <ScrollableText maxWidth={"50vh"}>{v.name}</ScrollableText>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" sx={{ py: 3, color: "text.secondary" }}>
                {texts.vaccines.table.empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

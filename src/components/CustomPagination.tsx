import { Button, Pagination, Stack } from "@mui/material";

type CustomPaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  onChangePage: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
};

export default function CustomPagination({
  page,
  totalPages,
  pageSize,
  onChangePage,
  onPageSizeChange,
}: CustomPaginationProps) {
  const handleToggleSize = () => {
    const nextSize = pageSize === 5 ? 10 : 5;
    onPageSizeChange(nextSize);
  };

  return (
    <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, v) => onChangePage(v)}
        color="primary"
        showFirstButton
        showLastButton
      />

      <Button
        size="small"
        onClick={handleToggleSize}
        sx={{
          textTransform: "none",
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        Itens por página: <strong>{pageSize}</strong>
      </Button>
    </Stack>
  );
}

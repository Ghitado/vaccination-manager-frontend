import { Button, Pagination, Stack } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";

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
  const { texts } = useLanguage();

  const handleToggleSize = () => {
    const nextSize = pageSize >= 100 ? 10 : 100;
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
        sx={{ opacity: totalPages <= 1 ? 0.5 : 1 }}
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
        {pageSize >= 100
          ? texts.common.pagination.showPaged
          : texts.common.pagination.showAll}
      </Button>
    </Stack>
  );
}

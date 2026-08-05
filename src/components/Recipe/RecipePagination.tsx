"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "n@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "n@/components/ui/select";

interface RecipePaginationProps {
  totalRows: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function RecipePagination({
  totalRows,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: RecipePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startRow =
    totalRows === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRow = Math.min(safeCurrentPage * pageSize, totalRows);

  return (
    <div className="rounded-xl border border-border/60 bg-card px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startRow}-{endRow} of {totalRows}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-secondary uppercase">
              Per page
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[6, 12, 24, 48].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={safeCurrentPage <= 1}
              onClick={() => onPageChange(safeCurrentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="min-w-24 text-center text-sm">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon-sm"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => onPageChange(safeCurrentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

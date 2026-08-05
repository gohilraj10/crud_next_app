"use client";

import {
  AllCommunityModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  SortChangedEvent,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "n@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "n@/components/ui/select";
import { ProductSortField } from "n@/types/product";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  loading?: boolean;
  totalRows: number;
  pageSize: number;
  currentPage: number;
  sortBy?: ProductSortField;
  sortOrder?: "asc" | "desc";
  onGridReady?: (event: GridReadyEvent<T>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChanged?: (
    sortBy: ProductSortField | null,
    order: "asc" | "desc" | null
  ) => void;
}

export default function DataTable<T>({
  rowData,
  columnDefs,
  loading = false,
  totalRows,
  pageSize,
  currentPage,
  sortBy,
  sortOrder,
  onGridReady,
  onPageChange,
  onPageSizeChange,
  onSortChanged,
}: AgGridTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startRow =
    totalRows === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRow = Math.min(safeCurrentPage * pageSize, totalRows);

  const handleSortChanged = (event: SortChangedEvent<T>) => {
    if (!onSortChanged) {
      return;
    }

    const sortedColumn = event.api
      .getColumnState()
      .find((column) => column.sort != null);

    if (!sortedColumn?.colId || !sortedColumn.sort) {
      onSortChanged(null, null);
      return;
    }

    onSortChanged(
      sortedColumn.colId as ProductSortField,
      sortedColumn.sort as "asc" | "desc"
    );
  };

  return (
    <div className="space-y-4">
      <div className="h-[650px] w-full overflow-hidden rounded-xl border border-border">
        <AgGridReact<T>
          theme={themeQuartz}
          rowData={rowData}
          columnDefs={columnDefs}
          loading={loading}
          animateRows
          pagination={false}
          suppressMultiSort
          defaultColDef={{
            sortable: true,
            filter: false,
            resizable: true,
            flex: 1,
          }}
          onGridReady={(event) => {
            if (sortBy && sortOrder) {
              event.api.applyColumnState({
                state: [{ colId: sortBy, sort: sortOrder }],
                defaultState: { sort: null },
              });
            }

            onGridReady?.(event);
          }}
          onSortChanged={handleSortChanged}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startRow}-{endRow} of {totalRows}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-secondary uppercase">
              Rows
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((size) => (
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

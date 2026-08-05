"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, themeQuartz } from "ag-grid-community";

interface AgGridTableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  loading?: boolean;
  onGridReady?: (event: GridReadyEvent<T>) => void;
}

const myTheme = themeQuartz;

export default function DataTable<T>({
  rowData,
  columnDefs,
  loading,
  onGridReady,
}: AgGridTableProps<T>) {
  return (
    <div className="h-[650px] w-full overflow-hidden rounded-xl border border-border">
      <AgGridReact<T>
        theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        loading={loading}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        animateRows
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
        }}
        onGridReady={onGridReady}
      />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { getProductColumns } from "./productColumn";
import DeleteProductDialog from "./DeleteProductDialog";
import { Button } from "n@/components/ui/button";
import { Input } from "n@/components/ui/input";
import DataTable from "n@/components/common/table/Table";
import { useDeleteProduct } from "n@/hooks/productHooks/useDeleteProduct";
import { useGetProduct } from "n@/hooks/productHooks/useGetProduct";
import { useProductListParams } from "n@/hooks/useProductListParams";
import { Product, ProductSortField } from "n@/types/product";
import { productListStateToApiParams } from "n@/utils/productListState";

interface ProductSearchInputProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

function ProductSearchInput({
  initialQuery,
  onSearch,
}: ProductSearchInputProps) {
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchInput !== initialQuery) {
        onSearch(searchInput);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput, initialQuery, onSearch]);

  return (
    <Input
      type="search"
      placeholder="Search products..."
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      className="max-w-md border-border"
    />
  );
}

function ProductListContent() {
  const { listState, listQueryString, updateListState } =
    useProductListParams();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const apiParams = useMemo(
    () => productListStateToApiParams(listState),
    [listState]
  );

  const { data, isLoading, isFetching } = useGetProduct(apiParams);
  const deleteProductMutation = useDeleteProduct();

  const columnDefs = useMemo(
    () =>
      getProductColumns({
        listQueryString,
        onDelete: setProductToDelete,
      }),
    [listQueryString]
  );

  const handleDeleteConfirm = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      await deleteProductMutation.mutateAsync(productToDelete.id);
      toast.success(`"${productToDelete.title}" deleted successfully`);
      setProductToDelete(null);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href={
            listQueryString
              ? `/products/add?${listQueryString}`
              : "/products/add"
          }
        >
          <Button>Add Product</Button>
        </Link>
      </div>

      <ProductSearchInput
        key={listState.q}
        initialQuery={listState.q}
        onSearch={(q) => updateListState({ q })}
      />

      <DataTable
        rowData={data?.products ?? []}
        columnDefs={columnDefs}
        loading={isLoading || isFetching}
        totalRows={data?.total ?? 0}
        pageSize={listState.limit}
        currentPage={listState.page}
        sortBy={listState.sortBy}
        sortOrder={listState.order}
        onPageChange={(page) => updateListState({ page })}
        onPageSizeChange={(limit) => updateListState({ limit })}
        onSortChanged={(sortBy, order) => {
          if (!sortBy || !order) {
            if (listState.sortBy !== "title" || listState.order !== "asc") {
              updateListState({ sortBy: "title", order: "asc" });
            }
            return;
          }

          if (sortBy !== listState.sortBy || order !== listState.order) {
            updateListState({
              sortBy: sortBy as ProductSortField,
              order,
            });
          }
        }}
      />

      <DeleteProductDialog
        product={productToDelete}
        open={productToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteProductMutation.isPending}
      />
    </section>
  );
}

export default function ProductList() {
  return <ProductListContent />;
}

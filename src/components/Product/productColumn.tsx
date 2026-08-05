"use client";

import Link from "next/link";
import Image from "next/image";
import { ColDef } from "ag-grid-community";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Product } from "n@/types/product";

interface ProductColumnOptions {
  listQueryString: string;
  onDelete: (product: Product) => void;
}

const withListQuery = (path: string, listQueryString: string) =>
  listQueryString ? `${path}?${listQueryString}` : path;

export const getProductColumns = ({
  listQueryString,
  onDelete,
}: ProductColumnOptions): ColDef<Product>[] => [
  {
    headerName: "Image",
    field: "thumbnail",
    width: 90,
    sortable: false,
    cellRenderer: ({ value }: { value: string }) => (
      <Image
        src={value}
        alt="product"
        width={50}
        height={50}
        className="rounded-md object-cover"
      />
    ),
  },
  {
    headerName: "Title",
    field: "title",
    flex: 2,
  },
  {
    headerName: "Category",
    field: "category",
  },
  {
    headerName: "Brand",
    field: "brand",
    valueFormatter: ({ value }) => value ?? "-",
  },
  {
    headerName: "Price",
    field: "price",
    valueFormatter: ({ value }) => `$${value}`,
  },
  {
    headerName: "Rating",
    field: "rating",
  },
  {
    headerName: "Stock",
    field: "stock",
  },
  {
    headerName: "Actions",
    sortable: false,
    width: 180,
    cellRenderer: ({ data }: { data: Product }) => (
      <div className="flex h-full items-center gap-2">
        <Link
          href={withListQuery(`/products/${data.id}`, listQueryString)}
          aria-label={`View ${data.title}`}
        >
          <Eye className="h-4 w-4 text-primary" />
        </Link>

        <Link
          href={withListQuery(`/products/edit/${data.id}`, listQueryString)}
          aria-label={`Edit ${data.title}`}
        >
          <Pencil className="h-4 w-4 text-secondary" />
        </Link>

        <button
          type="button"
          aria-label={`Delete ${data.title}`}
          onClick={() => onDelete(data)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>
    ),
  },
];

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import { Button } from "n@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "n@/components/ui/card";
import { useGetProductById } from "n@/hooks/productHooks/useGetProductById";
import {
  buildProductsListPath,
  parseProductListState,
} from "n@/utils/productListState";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const searchParams = useSearchParams();
  const listPath = useMemo(
    () => buildProductsListPath(parseProductListState(searchParams)),
    [searchParams]
  );

  const listQueryString = searchParams.toString();
  const editHref = listQueryString
    ? `/products/edit/${productId}?${listQueryString}`
    : `/products/edit/${productId}`;

  const { data: product, isLoading, isError } = useGetProductById(productId);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading product...</p>;
  }

  if (isError || !product) {
    return (
      <section className="space-y-4">
        <Link href={listPath}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <p className="text-destructive">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href={listPath}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <Link href={editHref}>
          <Button variant="secondary">
            <Pencil className="h-4 w-4" />
            Edit Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={240}
              height={240}
              className="rounded-md border border-border object-cover"
            />

            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <DetailItem label="Price" value={`$${product.price}`} />
              <DetailItem
                label="Discount"
                value={`${product.discountPercentage}%`}
              />
              <DetailItem label="Rating" value={String(product.rating)} />
              <DetailItem label="Stock" value={String(product.stock)} />
              <DetailItem label="Brand" value={product.brand ?? "-"} />
              <DetailItem label="SKU" value={product.sku} />
              <DetailItem label="Weight" value={String(product.weight)} />
              <DetailItem
                label="Availability"
                value={product.availabilityStatus}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-wide text-secondary uppercase">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailItem
              label="Shipping"
              value={product.shippingInformation}
            />
            <DetailItem label="Warranty" value={product.warrantyInformation} />
            <DetailItem label="Return Policy" value={product.returnPolicy} />
            <DetailItem
              label="Minimum Order"
              value={String(product.minimumOrderQuantity)}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-secondary uppercase">
        {label}
      </p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

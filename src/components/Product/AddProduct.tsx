"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import ProductForm from "./ProductForm";
import { Button } from "n@/components/ui/button";
import { useCreateProduct } from "n@/hooks/productHooks/useCreateProduct";
import { ProductFormValues } from "n@/types/product";
import {
  buildProductsListPath,
  parseProductListState,
} from "n@/utils/productListState";

export default function AddProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listPath = useMemo(
    () => buildProductsListPath(parseProductListState(searchParams)),
    [searchParams]
  );

  const createProductMutation = useCreateProduct();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await createProductMutation.mutateAsync({
        title: values.title,
        description: values.description,
        category: values.category,
        price: values.price,
        discountPercentage: values.discountPercentage,
        stock: values.stock,
        brand: values.brand || undefined,
        sku: values.sku,
        weight: values.weight,
        thumbnail: values.thumbnail,
      });

      toast.success("Product created successfully");
      router.push(listPath);
    } catch {
      toast.error("Failed to create product");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Product</h1>

        <Link href={listPath}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        isSubmitting={createProductMutation.isPending}
        submitLabel="Create Product"
      />
    </section>
  );
}

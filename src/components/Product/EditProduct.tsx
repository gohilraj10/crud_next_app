"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import ProductForm from "./ProductForm";
import { productToFormValues } from "./productFormSchema";
import { Button } from "n@/components/ui/button";
import { useGetProductById } from "n@/hooks/productHooks/useGetProductById";
import { useUpdateProduct } from "n@/hooks/productHooks/useUpdateProduct";
import { ProductFormValues } from "n@/types/product";
import {
  buildProductsListPath,
  parseProductListState,
} from "n@/utils/productListState";

interface EditProductProps {
  productId: number;
}

export default function EditProduct({ productId }: EditProductProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listPath = useMemo(
    () => buildProductsListPath(parseProductListState(searchParams)),
    [searchParams]
  );

  const { data: product, isLoading, isError } = useGetProductById(productId);
  const updateProductMutation = useUpdateProduct();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await updateProductMutation.mutateAsync({
        id: productId,
        payload: {
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
        },
      });

      toast.success("Product updated successfully");
      router.push(listPath);
    } catch {
      toast.error("Failed to update product");
    }
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Product</h1>

        <Link href={listPath}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <ProductForm
        key={product.id}
        defaultValues={productToFormValues(product)}
        onSubmit={handleSubmit}
        isSubmitting={updateProductMutation.isPending}
        submitLabel="Update Product"
      />
    </section>
  );
}

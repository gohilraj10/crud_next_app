import { Suspense } from "react";

import ProductDetail from "n@/components/Product/ProductDetail";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <ProductDetail productId={Number(id)} />
    </Suspense>
  );
}

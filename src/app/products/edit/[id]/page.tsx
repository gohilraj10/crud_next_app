import { Suspense } from "react";

import EditProduct from "n@/components/Product/EditProduct";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <EditProduct productId={Number(id)} />
    </Suspense>
  );
}

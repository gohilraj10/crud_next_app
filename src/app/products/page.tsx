import { Suspense } from "react";

import ProductList from "n@/components/Product/ProductList";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading products...</p>}>
      <ProductList />
    </Suspense>
  );
}

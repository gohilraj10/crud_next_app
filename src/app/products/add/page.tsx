import { Suspense } from "react";

import AddProduct from "n@/components/Product/AddProduct";

export default function AddProductPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <AddProduct />
    </Suspense>
  );
}

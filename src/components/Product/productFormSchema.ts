import * as yup from "yup";

import { ProductFormValues } from "n@/types/product";

export const productFormSchema: yup.ObjectSchema<ProductFormValues> = yup
  .object({
    title: yup.string().trim().required("Title is required"),
    description: yup.string().trim().required("Description is required"),
    category: yup.string().required("Category is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price must be at least 0"),
    discountPercentage: yup
      .number()
      .typeError("Discount must be a number")
      .min(0, "Discount must be at least 0")
      .max(100, "Discount cannot exceed 100")
      .required("Discount is required"),
    stock: yup
      .number()
      .typeError("Stock must be a number")
      .required("Stock is required")
      .min(0, "Stock must be at least 0"),
    brand: yup.string().default(""),
    sku: yup.string().trim().required("SKU is required"),
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .required("Weight is required")
      .min(0, "Weight must be at least 0"),
    thumbnail: yup
      .string()
      .url("Enter a valid thumbnail URL")
      .required("Thumbnail URL is required"),
  })
  .required();

export const defaultProductFormValues: ProductFormValues = {
  title: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  stock: 0,
  brand: "",
  sku: "",
  weight: 0,
  thumbnail: "",
};

export const productToFormValues = (product: {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand?: string;
  sku: string;
  weight: number;
  thumbnail: string;
}): ProductFormValues => ({
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  discountPercentage: product.discountPercentage,
  stock: product.stock,
  brand: product.brand ?? "",
  sku: product.sku,
  weight: product.weight,
  thumbnail: product.thumbnail,
});

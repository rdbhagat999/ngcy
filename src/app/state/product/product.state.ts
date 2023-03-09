import { IProductAPIResponse } from "@app/_shared/_models";

export const productFeatureKey = "product_feature_key";

export type ProductState = IProductAPIResponse;

export const productInitialState: ProductState = {
  products: [],
  total: 0,
  skip: 0,
  limit: 10,
};

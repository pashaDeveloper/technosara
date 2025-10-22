
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const technosaraApi = createApi({
  reducerPath: "technosaraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: [
    "User",
    "Product",
    "Brand",
    "Category",
    "Store",
    "Cart",
    "Favorite",
    "Purchase",
    "Review",
    "Tag",
    "Unit",
    "Post",
    "Blog",
    "Gallery",
    "InsuranceCompany",
    "Admin",
    "Insurance",
    "Color",
    "Warranty",
    "Icon"
  ],
  endpoints: () => ({}),
});

import { technosaraApi } from "../technosara";

const brandApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new brand
    addBrand: builder.mutation({
      query: (body) => ({
        url: "/brand/add-brand",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Brand", "User"],
    }),

    // get all brands
    getBrands: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/brand/get-brands/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // update brand
    updateBrand: builder.mutation({
      query: ({ id, body }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Brand", "User"],
    }),

    // get a brand
    getBrand: builder.query({
      query: (id) => ({
        url: `/brand/get-brand/${id}`,
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // delete a brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Brand", "User"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
} = brandApi;

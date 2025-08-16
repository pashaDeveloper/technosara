import { technosaraApi } from "../technosara";

const warrantyCompanyApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new warrantyCompany
    addWarrantyCompany: builder.mutation({
      query: (body) => ({
        url: "/warrantyCompany/add-warrantyCompany",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["WarrantyCompany", "User"],
    }),

    // get all warrantyCompanies
getWarrantyCompanies: builder.query({
  query: ({ page = 1, limit = 5, search = "" }) => ({
    url: `/warrantyCompany/get-warrantyCompanies?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    method: "GET",
  }),
  providesTags: ["WarrantyCompany"],
}),

    // update warrantyCompany
    updateWarrantyCompany: builder.mutation({
      query: ({ id, body }) => ({
        url: `/warrantyCompany/update-warrantyCompany/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["WarrantyCompany", "User"],
    }),

    // get a warrantyCompany
    getWarrantyCompany: builder.query({
      query: (id) => ({
        url: `/warrantyCompany/get-warrantyCompany/${id}`,
        method: "GET",
      }),

      providesTags: ["WarrantyCompany"],
    }),

    // delete a warrantyCompany
    deleteWarrantyCompany: builder.mutation({
      query: (id) => ({
        url: `/warrantyCompany/delete-warrantyCompany/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["WarrantyCompany", "User"],
    }),
  }),
});

export const {
  useAddWarrantyCompanyMutation,
  useGetWarrantyCompaniesQuery,
  useUpdateWarrantyCompanyMutation,
  useGetWarrantyCompanyQuery,
  useDeleteWarrantyCompanyMutation,
} = warrantyCompanyApi;

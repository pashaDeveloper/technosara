import { technosaraApi } from "../technosara";

const warrantyApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new warranty
    addWarranty: builder.mutation({
      query: (body) => ({
        url: "/warranty/add-warranty",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["Warranty", "User"]
    }),

    // get all warrantys
    getWarranties: builder.query({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: `/warranty/get-warranties?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        method: "GET"
      }),
      providesTags: ["Warranty"]
    }),

    // update warranty
    updateWarranty: builder.mutation({
      query: ({ id, body }) => ({
        url: `/warranty/update-warranty/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["Warranty", "User"]
    }),

    // get a warranty
    getWarranty: builder.query({
      query: (id) => ({
        url: `/warranty/get-warranty/${id}`,
        method: "GET"
      }),

      providesTags: ["Warranty"]
    }),

    // delete a warranty
    deleteWarranty: builder.mutation({
      query: (id) => ({
        url: `/warranty/delete-warranty/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["Warranty", "User"]
    })
  })
});

export const {
  useAddWarrantyMutation,
  useGetWarrantiesQuery,
  useUpdateWarrantyMutation,
  useGetWarrantyQuery,
  useDeleteWarrantyMutation
} = warrantyApi;

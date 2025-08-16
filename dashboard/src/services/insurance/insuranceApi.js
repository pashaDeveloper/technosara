import { technosaraApi } from "../technosara";

const insuranceApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new insurance
    addInsurance: builder.mutation({
      query: (body) => ({
        url: "/insurance/add-insurance",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Insurance", "User"],
    }),

    // get all insurances
getInsurances: builder.query({
  query: ({ page = 1, limit = 5, search = "" }) => ({
    url: `/insurance/get-insurances?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    method: "GET",
  }),
  providesTags: ["Insurance"],
}),

    // update insurance
    updateInsurance: builder.mutation({
      query: ({ id, body }) => ({
        url: `/insurance/update-insurance/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Insurance", "User"],
    }),

    // get a insurance
    getInsurance: builder.query({
      query: (id) => ({
        url: `/insurance/get-insurance/${id}`,
        method: "GET",
      }),

      providesTags: ["Insurance"],
    }),

    // delete a insurance
    deleteInsurance: builder.mutation({
      query: (id) => ({
        url: `/insurance/delete-insurance/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Insurance", "User"],
    }),
  }),
});

export const {
  useAddInsuranceMutation,
  useGetInsurancesQuery,
  useUpdateInsuranceMutation,
  useGetInsuranceQuery,
  useDeleteInsuranceMutation,
} = insuranceApi;

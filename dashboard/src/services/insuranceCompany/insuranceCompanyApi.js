import { technosaraApi } from "../technosara";

const insuranceCompanyApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new insuranceCompany
    addInsuranceCompany: builder.mutation({
      query: (body) => ({
        url: "/insuranceCompany/add-insuranceCompany",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["InsuranceCompany", "User"],
    }),

    // get all insuranceCompanies
getInsuranceCompanies: builder.query({
  query: ({ page = 1, limit = 5, search = "" }) => ({
    url: `/insuranceCompany/get-insuranceCompanies?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    method: "GET",
  }),
  providesTags: ["InsuranceCompany"],
}),

    // update insuranceCompany
    updateInsuranceCompany: builder.mutation({
      query: ({ id, body }) => ({
        url: `/insuranceCompany/update-insuranceCompany/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["InsuranceCompany", "User"],
    }),

    // get a insuranceCompany
    getInsuranceCompany: builder.query({
      query: (id) => ({
        url: `/insuranceCompany/get-insuranceCompany/${id}`,
        method: "GET",
      }),

      providesTags: ["InsuranceCompany"],
    }),

    // delete a insuranceCompany
    deleteInsuranceCompany: builder.mutation({
      query: (id) => ({
        url: `/insuranceCompany/delete-insuranceCompany/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["InsuranceCompany", "User"],
    }),
  }),
});

export const {
  useAddInsuranceCompanyMutation,
  useGetInsuranceCompaniesQuery,
  useUpdateInsuranceCompanyMutation,
  useGetInsuranceCompanyQuery,
  useDeleteInsuranceCompanyMutation,
} = insuranceCompanyApi;

import { technosaraApi } from "../technosara";

const colorApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new color
    addColor: builder.mutation({
      query: (body) => ({
        url: "/color/add-color",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Color", "Admin"],
    }),

    // get all colors
    getColors: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/color/get-colors/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["Color"],
    }),

    // update color
    updateColor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/color/update-color/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Color", "Admin"],
    }),

    // get a color
    getColor: builder.query({
      query: (id) => ({
        url: `/color/get-color/${id}`,
        method: "GET",
      }),

      providesTags: ["Color"],
    }),

    // delete a color
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete-color/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Color", "Admin"],
    }),
  }),
});

export const {
  useAddColorMutation,
  useGetColorsQuery,
  useUpdateColorMutation,
  useGetColorQuery,
  useDeleteColorMutation,
} = colorApi;

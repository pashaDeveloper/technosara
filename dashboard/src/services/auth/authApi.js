import { technosaraApi } from "../technosara";

const authApi = technosaraApi.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (body) => {
        return {
          url: "/admin/sign-up",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Admin"],
    }),
    

    // signIn
    signIn: builder.mutation({
      query: (body) => ({
        url: "/admin/sign-in",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (adminInfo) => ({
        url: "/admin/forgot-password",
        method: "PATCH",
        body: adminInfo,
      }),
    }),

   // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/admin/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  usePersistLoginQuery,
  useForgotPasswordMutation,
} = authApi;

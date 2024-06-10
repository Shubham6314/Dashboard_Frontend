import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const signUpApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getSignUpByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/user/register",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetSignUpByNameMutation } = signUpApi;
export default signUpApi;

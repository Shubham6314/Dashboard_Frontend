import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getLoginByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/user/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetLoginByNameMutation } = loginApi;
export default loginApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const deleteRestoreApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getDeleteRestoreByName: builders.mutation({
      query: ({ body }) => ({
        url: `/api/user/deleterestore`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const { useGetDeleteRestoreByNameMutation } = deleteRestoreApi;
export default deleteRestoreApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const permanentDeleteApi = createApi({
  reducerPath: "permanentDeleteApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getPermanentDeleteByName: builders.mutation({
      query: ({ id }) => ({
        url: `/api/user/update?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const { useGetPermanentDeleteByNameMutation } = permanentDeleteApi;
export default permanentDeleteApi;

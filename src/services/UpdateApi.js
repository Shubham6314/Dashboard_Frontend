import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const updateApi = createApi({
  reducerPath: "updateApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUpdateByName: builders.mutation({
      query: ({ body, token, id }) => ({
        url: `/api/user/update?id=${id}`,
        method: "PUT",
        id: id,
        body: body,
        headers: { Authorization: `Bearer${token}` },
      }),
    }),
  }),
});
export const { useGetUpdateByNameMutation } = updateApi;
export default updateApi;

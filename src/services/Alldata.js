import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const allDataApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAllDataByName: builders.query({
      query: () => ({
        url: "/api/user/alldata",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllDataByNameQuery, useLazyGetAllDataByNameQuery } =
  allDataApi;
export default allDataApi;

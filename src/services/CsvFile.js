import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const csvDataApi = createApi({
  reducerPath: "csvDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getCsvFile: builders.query({
      query: ({ value }) => `/api/user/${value}`,
    }),
  }),
});
export const { useLazyGetCsvFileQuery } = csvDataApi;
export default csvDataApi;

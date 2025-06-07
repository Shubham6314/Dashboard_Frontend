import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const csvDataApi = createApi({
  reducerPath: "csvDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getCsvFile: builders.query({
      query: ({ value }) => ({
        url: `/api/user/${value}`,
        method: "GET",
        responseHandler: async (response) => {
          if (response.headers.get("Content-Type")?.includes("text/csv")) {
            return response.text();
          } else if (
            response.headers.get("Content-Type")?.includes("application/pdf")
          ) {
            return response.blob();
          } else {
            return response.json();
          }
        },
      }),
    }),
  }),
});
export const { useLazyGetCsvFileQuery } = csvDataApi;
export default csvDataApi;

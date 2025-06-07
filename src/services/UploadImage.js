import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../FormTask/Constant";
export const uploadImage = createApi({
  reducerPath: "uploadImage",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUploadImageByName: builders.mutation({
      mutation: (body) => ({
        url: `/api/user/uploadimage`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const { useGetUploadImageByNameMutation } = uploadImage;
export default uploadImage;

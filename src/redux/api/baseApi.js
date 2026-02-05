import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import { Settings } from "../../api";

const baseQuery = async (args, api, extraOptions) => {
  const { method, body } = args;

  if (method === "POST") {
    const generatedToken = handleRandomToken();
    let payload = {
      ...body,
      token: generatedToken,
      site: Settings.siteUrl,
    };
    if (Settings.language) {
      payload.language = localStorage.getItem("language") || "english";
    }

    const encryptedData = handleEncryptData(payload);
    args.body = encryptedData;
  }

  return fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});

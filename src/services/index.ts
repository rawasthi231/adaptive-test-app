import config from "@/config";

import { ApiResponse } from "@/typings";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/**
 * This TypeScript function defines an API request handler that supports various HTTP methods and
 * handles session expiration by redirecting to the login page if needed.
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method - The `method` parameter in the `api`
 * function specifies the HTTP method to be used for the API request. It can be one of the following
 * values: "GET", "POST", "PUT", "PATCH", or "DELETE".
 * @returns {Promise<T>} - The `api` function returns a Promise that resolves to the JSON response from the API.
 * @example
 * const data = await get<IGetStaticContents>(ROUTES.GET_STATIC_CONTENTS);
 *
 */
const api =
  (method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE") =>
  async <T, R = undefined>(
    endpoint: string,
    data?: T,
    extraConfig?: RequestInit
  ): Promise<ApiResponse<R>> => {
    let queryParams = "";
    if (method === "GET" && data) {
      // Convert the data object to query parameters
      const searchParams = new URLSearchParams();

      // Iterate over the data object entries
      for (const [key, value] of Object.entries(
        data as Record<string, string>
      )) {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      }

      // Construct the query string
      queryParams = `?${searchParams.toString()}`;
    }
    const requestConfig: RequestInit = {
      method,
      headers: {
        ...headers,
      },
      credentials: "include",
      ...extraConfig,
    };

    // Only add body for methods other than GET
    if (method !== "GET") {
      requestConfig.body = JSON.stringify(data);
    }

    return await fetch(
      `${config.baseUrl}${endpoint}${queryParams}`,
      requestConfig
    ).then((res) => {
      if (res.status === 401) {
        // window.location.href = "/login?sessionExpired=true";
        return;
      }

      return res.json();
    });
  };

/**
 * The `get`, `post`, `put`, `patch`, and `del` functions are API request handlers that support various
 */
export const get = api("GET");
export const post = api("POST");
export const put = api("PUT");
export const patch = api("PATCH");
export const del = api("DELETE");

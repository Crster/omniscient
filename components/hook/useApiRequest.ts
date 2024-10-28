import { ApiResponse } from "@/libraries/ApiHandler";

export default function useApiRequest() {
  return async function call<DataType = any>(
    api: string,
    key?: string | any,
    value?: any,
  ): Promise<ApiResponse<DataType>> {
    const url = new URL(`/api/${api}`, window.location.origin);
    const request: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (key && value) {
      url.searchParams.append("id", key);
      request.body = JSON.stringify(value);
    } else if (key && typeof key === "string") {
      url.searchParams.append("id", key);
    } else if (key && typeof key === "object") {
      request.body = JSON.stringify(key);
    }

    const response = await fetch(url, request);

    if (!response.ok) throw new Error(`${response.status}: Invalid server response`);

    const data: ApiResponse<DataType> = await response.json();

    if (data.status === "redirect") {
      window.location.href = new URL(data.data.url, window.location.origin).href;
    }

    return data;
  };
}

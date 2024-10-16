import * as XSON from "enhancejson";

export interface ApiResponse<DataType = any> {
  success: boolean;
  data: DataType;
  error: string;
  redirect: string;
}

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
        "Content-Type": "text/xson",
      },
    };

    if (key && value) {
      url.searchParams.append("id", key);
      request.body = XSON.stringify(value);
    } else if (key && typeof key === "string") {
      url.searchParams.append("id", key);
    } else if (key && typeof key === "object") {
      request.body = XSON.stringify(key);
    }

    const response = await fetch(url, request);

    if (!response.ok) throw new Error(`${response.status}: Invalid server response`);

    const responseBody = await response.text();
    const data: ApiResponse<DataType> = XSON.parse(responseBody);

    if (data.success && data.redirect) {
      window.location.href = new URL(data.redirect, window.location.origin).href;
    }

    return data;
  };
}

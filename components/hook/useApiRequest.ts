export interface ApiSuccessResponse<DataType> {
  status: "success";
  data?: DataType;
}

export interface ApiRedirectResponse {
  status: "redirect";
  data: { url: string; reason: string };
}

export interface ApiErrorResponse {
  status: "error";
  data: { error: string; message: string; reason: any };
}

export type ApiResponse<DataType> = ApiSuccessResponse<DataType> | ApiRedirectResponse | ApiErrorResponse;

export default function useApiRequest() {
  return async function call<DataType = any>(
    api: string,
    key?: string | any,
    value?: any,
  ): Promise<ApiResponse<DataType>> {
    const url = new URL(`/api/${api}`, window.location.origin);
    let body: string = "";

    if (key && value) {
      url.searchParams.append("id", key);
      body = JSON.stringify(value);
    } else if (key && typeof key === "string") {
      url.searchParams.append("id", key);
    } else if (key && typeof key === "object") {
      body = JSON.stringify(key);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) throw new Error(`${response.status}: Invalid server response`);

    const data: ApiResponse<DataType> = await response.json();

    if (data.status === "redirect") {
      window.location.href = new URL(data.data.url, window.location.origin).href;
    }

    return data;
  };
}

export interface ReqwesOption {
  baseUrl?: string;
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}
export class CriticalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CriticalError";
  }
}

export class Reqwes {
  private baseUrl: string;

  constructor(options?: ReqwesOption) {
    this.baseUrl = options?.baseUrl || "";
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Resource not found: ${url}`);
      } else if (response.status === 401) {
        throw new UnauthorizedError(`Unauthorized access: ${url}`);
      } else if (response.status === 400) {
        throw new BadRequestError(`Bad request: ${url}`);
      } else {
        throw new CriticalError(`${response.statusText}: ${response.status}`);
      }
    }

    return response.json() as Promise<T>;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Resource not found: ${url}`);
      } else if (response.status === 401) {
        throw new UnauthorizedError(`Unauthorized access: ${url}`);
      } else if (response.status === 400) {
        throw new BadRequestError(`Bad request: ${url}`);
      } else {
        throw new CriticalError(`${response.statusText}: ${response.status}`);
      }
    }

    return response.json() as Promise<T>;
  }

  async postForm<T>(url: string, data: FormData): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Resource not found: ${url}`);
      } else if (response.status === 401) {
        throw new UnauthorizedError(`Unauthorized access: ${url}`);
      } else if (response.status === 400) {
        throw new BadRequestError(`Bad request: ${url}`);
      } else {
        throw new CriticalError(`${response.statusText}: ${response.status}`);
      }
    }

    return response.json() as Promise<T>;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Resource not found: ${url}`);
      } else if (response.status === 401) {
        throw new UnauthorizedError(`Unauthorized access: ${url}`);
      } else if (response.status === 400) {
        throw new BadRequestError(`Bad request: ${url}`);
      } else {
        throw new CriticalError(`${response.statusText}: ${response.status}`);
      }
    }

    return response.json() as Promise<T>;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Resource not found: ${url}`);
      } else if (response.status === 401) {
        throw new UnauthorizedError(`Unauthorized access: ${url}`);
      } else if (response.status === 400) {
        throw new BadRequestError(`Bad request: ${url}`);
      } else {
        throw new CriticalError(`${response.statusText}: ${response.status}`);
      }
    }

    return response.json() as Promise<T>;
  }
}

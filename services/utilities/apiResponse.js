export class ApiResponse {
  constructor() {
    this.success = false;
  }

  toJson() {
    return {
      success: this.success,
      data: this.data,
      error: this.error,
    };
  }
}


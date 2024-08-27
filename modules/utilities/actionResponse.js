export class ActionResponse {
  success = false;
  data = undefined;
  error = undefined;

  toJson() {
    return {
      success: this.success,
      data: this.data,
      error: this.error,
    };
  }
}

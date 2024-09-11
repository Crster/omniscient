import connectDB from "../utilities/database";
import UserService from "../services/UserService";
import { SavingError, ValidationError } from "../utilities/error";
import { ActionResponse } from "../utilities/actionResponse";

export default async function editUser({ id, ...data }) {
  const response = new ActionResponse();
  const userService = new UserService();

  try {
    await connectDB();
    const user = await userService.updateUser(id, data);

    response.data = userService.toResponse(user);
    response.success = true;
  } catch (err) {
    if (err instanceof SavingError) {
      response.error = "Failed to edit user";
    } else if (err instanceof ValidationError) {
      response.error = err.message;
    } else {
      response.error = "Unknown error";
    }
  }

  return response.toJson();
}

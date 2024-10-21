import { z } from "zod";

import { apiHandler } from "@/libraries/ApiHandler";
import { AuthorizationError, BadRequestError, Redirect } from "@/libraries/Error";
import { User } from "@/services/User/User";
import { UserRepository } from "@/services/User/UserRepository";
import { UserRole } from "@/services/Data/UserRole";

export default apiHandler(async (req) => {
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  const userRepo = new UserRepository();

  const credential = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(req.value);

  let userId: string;
  let user = await userRepo.getByCredential(credential.email, credential.password).catch();

  if (!user) {
    if (await userRepo.hasUser()) throw new AuthorizationError("Invalid credential", { credential });

    user = new User({
      name: "System Admin",
      email: credential.email,
      password: credential.password,
    });
    user.role = UserRole.Admin;

    userId = await userRepo.create(user);
  } else {
    userId = user.userId as string;
  }

  req.session.user = userId;
  await req.session?.save();

  throw new Redirect("/", "Login success");
});

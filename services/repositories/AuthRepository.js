import { NotFoundError } from "../utilities/error";
import { sha256 } from "../utilities/generator";
import { credentialSchema } from "../schemas/credentialSchema";
import { db } from "../utilities/database";

export default class AuthRepository {
  async login(credential) {
    const input = credentialSchema.parse(credential);

    const user = await db.user.findOne({ email: input.email });
    if (!user) {
      throw new NotFoundError(input.email);
    }
    if (user.password !== sha256(input.password)) {
      throw new NotFoundError(input.email);
    }

    return user;
  }
}

import { UserModel } from "../data/user";
import { NotFoundError } from "../utilities/error";
import { sha256 } from "../utilities/generator";
import { credentialSchema } from "../schemas/credentialSchema";

export default class AuthService {
  async login(credential) {
    const input = credentialSchema.parse(credential);

    const user = await UserModel.findOne({ email: input.email }).exec();
    if (!user) {
      throw new NotFoundError(input.email);
    }
    if (user.password !== sha256(input.password)) {
      throw new NotFoundError(input.email);
    }

    return user;
  }
}

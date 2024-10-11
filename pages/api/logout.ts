import { apiHandler } from "@/libraries/ApiHandler";
import { Redirect } from "@/libraries/Error";

export default apiHandler(async (req) => {
  req.session.destroy();
  throw new Redirect("/login");
});

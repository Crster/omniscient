import { apiHandler } from "@/libraries/ApiHandler";

export default apiHandler(async (req) => {
  req.session.destroy();
});

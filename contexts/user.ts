import { useAsyncList } from "react-stately";
import { useDisclosure } from "@heroui/react";
import { reqwes } from "@/configs/reqwes";
import { User } from "@/services/user/user.model";
import { createPageContext } from "@/utils/page-context";

export const userPageContext = createPageContext(() => {
  const addUserModal = useDisclosure();

  const userList = useAsyncList<User>({
    getKey: (item) => item.id,
    async load({ signal }) {
      const users = await reqwes.get<User[]>("/api/user", signal);

      return { items: users };
    },
  });

  return {
    userList,
    addUserModal,
  };
});

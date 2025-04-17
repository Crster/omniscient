import { reqwes } from "@/configs/reqwes";
import { User } from "@/services/user/user.model";
import { create } from "zustand";

interface UserPageState {
  users: User[];
}

interface UserPageAction {
  init: () => Promise<void>;
}

export const useUserPageContext = create<UserPageAction & UserPageState>((set) => ({
  init: async () => {
    const users = await reqwes.get<User[]>("/api/user");
    set({ users });
  },
  users: [],
}));

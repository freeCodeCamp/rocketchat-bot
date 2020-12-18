import { api } from "@rocket.chat/sdk";
import { RoleListInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

export const getModerators = async (bot: BotInt): Promise<string[]> => {
  const modUsers: string[] = [];

  const roleList = process.env.ROLE_LIST?.split(",") || ["none"];
  for (const role of roleList) {
    if (role === "none") {
      continue;
    }

    const modList: RoleListInt = await api.get("roles.getUsersInRole", {
      role,
    });

    for (const mod of modList.users) {
      if (!modUsers.includes(mod.username)) {
        modUsers.push(mod.username);
      }
    }
  }
  return modUsers;
};

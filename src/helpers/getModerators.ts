import { api } from "@rocket.chat/sdk";
import { RoleListInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

/**
 * Queries the Rocket.Chat API to retrieve a list of all
 * users who have at least one of the moderator roles
 * set in the .env file.
 * @param {BotInt} BOT The bot's configuration object.
 * @returns {Promise<string[]>} An array of usernames as strings.
 */
export const getModerators = async (BOT: BotInt): Promise<string[]> => {
  const modUsers: string[] = [];

  const roleList = BOT.modRoles;
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

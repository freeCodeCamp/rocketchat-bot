import fetch from "node-fetch";
import { RoleListInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

export const getModerators = async (bot: BotInt): Promise<string[]> => {
  const modUsers: string[] = [];

  const roleList = process.env.ROLE_LIST?.split(",") || ["none"];
  for (const role of roleList) {
    if (role === "none") {
      continue;
    }
    const modListRequest = await fetch(
      `http://${bot.hostPath}/api/v1/roles.getUsersInRole?role=${role}`,
      {
        method: "GET",
        headers: { "X-Auth-Token": bot.botToken, "X-User-ID": bot.botId },
      }
    );

    const modListResponse: RoleListInt = await modListRequest.json();

    if (!modListResponse.success) {
      console.error("Failed to get moderators");
      return [];
    }

    for (const mod of modListResponse.users) {
      if (!modUsers.includes(mod.username)) {
        modUsers.push(mod.username);
      }
    }
  }
  return modUsers;
};

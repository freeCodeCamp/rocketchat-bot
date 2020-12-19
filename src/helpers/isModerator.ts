import { api } from "@rocket.chat/sdk";
import { UserInfoInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

/**
 * Queries the Rocket.Chat API to determine if a given user
 * has at least one role in the moderator roles list set
 * through the .env
 * @param {string} userId The user ID to check
 * @param {BotInt} BOT Bot configuration object
 * @returns {Promise<boolean>} Boolean value for "does user have moderator role"
 */
export const isModerator = async (
  userId: string,
  BOT: BotInt
): Promise<boolean> => {
  const userInfo: UserInfoInt = await api.get("users.info", { userId });

  const roles = BOT.modRoles;

  for (const role of roles) {
    if (userInfo.user.roles.includes(role)) {
      return true;
    }
  }
  return false;
};

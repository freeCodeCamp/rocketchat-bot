import { api } from "@rocket.chat/sdk";
import { UserInfoInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

export const isModerator = async (
  userId: string,
  bot: BotInt
): Promise<boolean> => {
  const userInfo: UserInfoInt = await api.get("users.info", { userId });

  const roles = process.env.ROLE_LIST?.split(",") || ["none"];

  for (const role of roles) {
    if (userInfo.user.roles.includes(role)) {
      return true;
    }
  }
  return false;
};

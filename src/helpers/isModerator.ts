import fetch from "node-fetch";
import { UserInfoInt } from "../interfaces/apiInt";
import { BotInt } from "../interfaces/BotInt";

export const isModerator = async (
  userId: string,
  bot: BotInt
): Promise<boolean> => {
  const userInfoRequest = await fetch(
    `http://${bot.hostPath}/api/v1/users.info?userId=${userId}`,
    {
      method: "GET",
      headers: { "X-Auth-Token": bot.botToken, "X-User-ID": bot.botId },
    }
  );
  const userInfoResponse: UserInfoInt = await userInfoRequest.json();

  console.log(userInfoResponse);

  const roles = process.env.ROLE_LIST?.split(",") || ["none"];

  for (const role of roles) {
    if (userInfoResponse.user.roles.includes(role)) {
      return true;
    }
  }
  return false;
};

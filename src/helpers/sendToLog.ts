import { driver } from "@rocket.chat/sdk";
import { BotInt } from "../interfaces/BotInt";

export const sendToLog = async (message: string, bot: BotInt) => {
  const logChannel = bot.logChannel;

  if (!logChannel) {
    return;
  }

  await driver.sendToRoom(message, logChannel);
};

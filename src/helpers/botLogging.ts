import { driver } from "@rocket.chat/sdk";
import { BotInt } from "../interfaces/BotInt";

export const logBotMessage = async (
  logText: string,
  BOT: BotInt
): Promise<void> => {
  if (!BOT.botLogChannel) {
    return;
  }

  await driver.sendToRoom(logText, BOT.botLogChannel);
};

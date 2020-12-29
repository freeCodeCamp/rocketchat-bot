import { driver } from "@rocket.chat/sdk";
import { BotInt } from "../interfaces/BotInt";

/**
 * Sends the given message to the logChannel set
 * in the .env
 * @param {string} message Text to send
 * @param {BotInt} BOT Bot configuration object
 * @returns {Promise<void>} nothing
 */
export const sendToLog = async (
  message: string,
  BOT: BotInt
): Promise<void> => {
  const logChannel = BOT.modLogChannel;

  if (!logChannel) {
    return;
  }

  await driver.sendToRoom(message, logChannel);
};

import { driver } from "@rocket.chat/sdk";
import { BOT } from "..";
import { logBotMessage } from "../helpers/botLogging";
import { MessageInt } from "../interfaces/messageInt";
import { CommandList } from "./_CommandList";

/**
 * This is a command handler which runs on each message
 * that the bot receives.
 * @param {unknown} err RocketChat SDK uses an error first callback.
 * @param {string[]} messages This is actually an array of messages, not a single message.
 * @param {unknown} _messageOptions Not sure what this is...
 * @returns {Promise<void>} nothing
 * @todo Need to determine typing for the error and messageOptions?
 */
export const CommandHandler = async (
  err: unknown,
  messages: MessageInt[]
): Promise<void> => {
  if (err) {
    console.error(err);
    return;
  }
  const message = messages[0];

  console.log(message);

  if (!message.u || message.u._id === BOT.botId) {
    return;
  }

  if (message.replies) {
    return;
  }

  if (message.editedBy || message.editedAt) {
    return;
  }

  if (!message.msg) {
    console.error("Message empty??");
    return;
  }

  if (!message.rid) {
    console.error("No room id?");
    return;
  }

  const roomName = await driver.getRoomName(message.rid);
  const [prefix, commandName] = message.msg.split(" ");
  if (prefix.toLowerCase() === BOT.prefix) {
    const currentTime = Date.now();
    const timeSinceLastCommand = currentTime - BOT.lastCommandCalled;
    console.log(timeSinceLastCommand);
    if (timeSinceLastCommand < BOT.botRateLimit * 1000) {
      await driver.sendToRoom(
        `Sorry, @${
          message.u.username
        }, but commands are being called too quickly. Please wait ${
          BOT.botRateLimit - timeSinceLastCommand / 1000
        } seconds and try again.`,
        roomName
      );
      return;
    }
    for (const Command of CommandList) {
      if (commandName === Command.name) {
        await Command.command(message, roomName, BOT);
        await logBotMessage(
          `@${message.u.username} called the \`${commandName}\` command in #${roomName}.`,
          BOT
        );
        BOT.lastCommandCalled = Date.now();
        return;
      }
    }
    await driver.sendToRoom(
      `I am sorry, but \`${commandName}\` is not a valid command.`,
      roomName
    );
  }
};

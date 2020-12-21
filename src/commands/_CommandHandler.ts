import { driver } from "@rocket.chat/sdk";
import { IMessage } from "@rocket.chat/sdk/dist/config/messageInterfaces";
import { BOT } from "..";
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
  messages: IMessage[]
): Promise<void> => {
  if (err) {
    console.error(err);
    return;
  }
  const message = messages[0];
  if (!message.u || message.u._id === BOT.botId) {
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
    for (const Command of CommandList) {
      if (commandName === Command.name) {
        await Command.command(message, roomName, BOT);
        return;
      }
    }
    await driver.sendToRoom(
      `I am sorry, but \`${commandName}\` is not a valid command.`,
      roomName
    );
  }
};

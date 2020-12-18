import { driver } from "@rocket.chat/sdk";
import { IMessage } from "@rocket.chat/sdk/dist/config/messageInterfaces";
import { BOT } from "..";
import { CommandList } from "./_CommandList";

export const CommandHandler = async (
  err,
  messages: IMessage[],
  messageOptions
): Promise<void> => {
  if (err) {
    console.error(err);
    return;
  }
  const message = messages[0];
  if (message.u?._id === BOT.botId) {
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

  const roomname = await driver.getRoomName(message.rid);
  const [prefix, commandName] = message.msg.split(" ");
  if (prefix.toLowerCase() === BOT.prefix) {
    for (const Command of CommandList) {
      if (commandName === Command.name) {
        await Command.command(message, roomname, BOT);
        return;
      }
    }
  }
};

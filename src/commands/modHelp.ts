import { driver } from "@rocket.chat/sdk";
import { isModerator } from "../helpers/isModerator";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const modHelp: CommandInt = {
  name: "modHelp",
  description: "Returns information on the bot's list of moderation commands.",
  modCommand: true,
  command: async (message, room, BOT) => {
    if (!message.u) {
      return;
    }
    const isMod = await isModerator(message.u.username, BOT);
    if (!isMod) {
      await driver.sendToRoom(
        "Sorry, but this command is restricted to moderators.",
        room
      );
      return;
    }
    const commands = CommandList.filter((command) => command.modCommand).map(
      (command) => `\`${BOT.prefix} ${command.name}\`: ${command.description}`
    );
    const response = `Here are my available moderation commands:\n${commands
      .sort()
      .join("\n")}`;
    await driver.sendToRoom(response, room);
  },
};

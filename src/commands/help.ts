import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  description: "Returns information on the bot's list of commands.",
  modCommand: false,
  command: async (_message, room) => {
    const commands = CommandList.filter((command) => !command.modCommand).map(
      (command) => `\`${command.name}\`: ${command.description}`
    );
    const response = `Hello! I am a chat bot created specifically for this server! I have a few commands available - here is the information on those commands:\n${commands
      .sort()
      .join("\n")}`;
    await driver.sendToRoom(response, room);
  },
};

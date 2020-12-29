import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  description: "Returns information on the bot's list of commands.",
  parameters: ["?command"],
  usage: [
    "`{prefix} help` - will return a list of public commands",
    "`{prefix} help ?command` - will return a detailed description of that command.",
  ],
  modCommand: false,
  command: async (message, room, BOT) => {
    const commands = CommandList.filter((command) => !command.modCommand);

    const commandList = commands.map(
      (command) => `\`${BOT.prefix} ${command.name}\`: ${command.description}`
    );

    const [query] = message.msg!.split(" ").slice(2);

    if (!query) {
      const response = `Hello! I am a chat bot created specifically for this server! I have a few commands available - here is the information on those commands:\n${commandList
        .sort()
        .join("\n")}`;
      await driver.sendToRoom(response, room);
      return;
    }

    const targetCommand = commands.find((el) => el.name === query);

    if (!targetCommand) {
      const response = `I am so sorry, but I do not have a public ${query} command.`;
      await driver.sendToRoom(response, room);
      return;
    }

    const response = `*Information on my \`${query}\` command:*
_Description_
${targetCommand.description}

_Parameters_
${targetCommand.parameters.length ? targetCommand.parameters.join(" ") : "none"}

_Example Uses_
${targetCommand.usage
  .map((use) => use.replace(/\{prefix\}/g, BOT.prefix))
  .join("\n")}`;

    await driver.sendToRoom(response, room);
  },
};

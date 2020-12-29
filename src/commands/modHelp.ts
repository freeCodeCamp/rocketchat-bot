import { driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const modHelp: CommandInt = {
  name: "modHelp",
  description: "Returns information on the bot's list of moderation commands.",
  parameters: ["?command"],
  usage: [
    "`{prefix} modHelp` - will return a list of moderator-only commands",
    "`{prefix} modHelp ?command` - will return a detailed description of that command.",
  ],
  modCommand: true,
  command: async (message, room, BOT) => {
    try {
      const commands = CommandList.filter((command) => command.modCommand);

      const commandList = commands.map(
        (command) => `\`${BOT.prefix} ${command.name}\`: ${command.description}`
      );

      const isMod = await isModerator(message.u!.username, BOT);
      if (!isMod) {
        await driver.sendToRoom(
          "Sorry, but this command is restricted to moderators.",
          room
        );
        return;
      }

      const [query] = message.msg!.split(" ").slice(2);

      if (!query) {
        const response = `Here are my available moderation commands:\n${commandList
          .sort()
          .join("\n")}`;
        await driver.sendToRoom(response, room);
        return;
      }

      const targetCommand = commands.find((el) => el.name === query);

      if (!targetCommand) {
        const response = `I am so sorry, but I do not have a private ${query} command.`;
        await driver.sendToRoom(response, room);
        return;
      }

      const response = `*Information on my \`${query}\` command:*
_Description_
${targetCommand.description}

_Parameters_
${
  targetCommand.parameters.length ? targetCommand.parameters.join(", ") : "none"
}

_Example Uses_
${targetCommand.usage
  .map((use) => use.replace(/\{prefix\}/g, BOT.prefix))
  .join("\n")}`;

      await driver.sendToRoom(response, room);
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`modHelp\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

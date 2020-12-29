import { driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { CommandInt } from "../interfaces/CommandInt";

export const ping: CommandInt = {
  name: "ping",
  description: "Returns a response from the bot with the ping time.",
  parameters: [],
  usage: ["`{prefix} ping` - will return the bot's current response time."],
  modCommand: false,
  command: async (_message, room, BOT) => {
    try {
      const start = Date.now();

      await driver.sendToRoom(`Pong!`, room);

      await driver.sendToRoom(`Response Time: ${Date.now() - start}ms`, room);
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`ping\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

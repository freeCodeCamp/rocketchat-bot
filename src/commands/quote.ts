import { driver } from "@rocket.chat/sdk";
import { quotes } from "../assets/motivational-quotes";
import { logBotMessage } from "../helpers/botLogging";
import { CommandInt } from "../interfaces/CommandInt";

export const quote: CommandInt = {
  name: "quote",
  description: "Returns a quote from the freeCodeCamp repository.",
  parameters: [],
  usage: [
    "`{prefix} quote` - will return a random quote from freeCodeCamp's curated list of motivational quotes/phrases.",
  ],
  modCommand: false,
  command: async (_message, room, BOT) => {
    try {
      const randomIndex = Math.floor(
        Math.random() * quotes.motivationalQuotes.length
      );

      const { quote, author } = quotes.motivationalQuotes[randomIndex];

      const response = `"${quote}"\n_--${author}_`;

      await driver.sendToRoom(response, room);
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`quote\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

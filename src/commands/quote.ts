import { driver } from "@rocket.chat/sdk";
import { quotes } from "../assets/motivational-quotes";
import { CommandInt } from "../interfaces/CommandInt";

export const quote: CommandInt = {
  name: "quote",
  description: "Returns a quote from the freeCodeCamp repository.",
  modCommand: false,
  command: async (_message, room) => {
    const randomIndex = Math.floor(
      Math.random() * quotes.motivationalQuotes.length
    );

    const { quote, author } = quotes.motivationalQuotes[randomIndex];

    const response = `"${quote}"\n_--${author}_`;

    await driver.sendToRoom(response, room);
  },
};

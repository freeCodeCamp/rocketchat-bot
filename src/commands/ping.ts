import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";

export const ping: CommandInt = {
  name: "ping",
  description: "Returns a response from the bot with the ping time.",
  parameters: [],
  usage: ["`{prefix} ping` - will return the bot's current response time."],
  modCommand: false,
  command: async (_message, room) => {
    const start = Date.now();

    await driver.sendToRoom(`Pong!`, room);

    await driver.sendToRoom(`Response Time: ${Date.now() - start}ms`, room);
  },
};

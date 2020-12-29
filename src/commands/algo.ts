import { driver } from "@rocket.chat/sdk";
import { algorithmSlugs } from "../assets/algorithm-structure";
import { logBotMessage } from "../helpers/botLogging";
import { CommandInt } from "../interfaces/CommandInt";

export const algo: CommandInt = {
  name: "algo",
  description: "Returns a random freeCodeCamp algorithm challenge.",
  parameters: [],
  usage: [
    "`{prefix} algo` - Will return a random freeCodeCamp algorithm challenge.",
  ],
  modCommand: false,
  command: async (_, room, BOT) => {
    try {
      const randomSuper = Math.floor(Math.random() * algorithmSlugs.length);
      const selectedSuper = algorithmSlugs[randomSuper];
      const randomBlock = Math.floor(
        Math.random() * selectedSuper.blocks.length
      );
      const selectedBlock = selectedSuper.blocks[randomBlock];
      const randomChallenge = Math.floor(
        Math.random() * selectedBlock.challenges.length
      );
      const challenge = selectedBlock.challenges[randomChallenge];

      const response = `Here is an algorithm challenge for you!\nhttps://freecodecamp.org/learn/${selectedSuper.superblock}/${selectedBlock.block}/${challenge}\nHappy Coding!`;
      await driver.sendToRoom(response, room);
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`algo\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

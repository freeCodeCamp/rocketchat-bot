import { driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { CommandInt } from "../interfaces/CommandInt";

export const rescind: CommandInt = {
  name: "rescind",
  description:
    "Notifies a user that the warning they received has been rescinded.",
  parameters: ["user"],
  usage: [
    "`{prefix} rescind user` - will notify the `user` that the warning they received has been rescinded, and will log that action in the log channel.",
  ],
  modCommand: true,
  command: async (message, room, BOT) => {
    try {
      if (!message.msg || !message.u) {
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

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [username] = message.msg!.split(" ").slice(2);

      const target = username.startsWith("@")
        ? username.substring(1)
        : username;

      if (!target) {
        await driver.sendToRoom(
          "Sorry, but who did you want me to rescind a warning for?",
          room
        );
        return;
      }

      await driver.sendDirectToUser(
        `${message.u.username} has rescinded your previous warning. Please remember to follow our [Code of Conduct](https://freecodecamp.org/news/code-of-conduct).`,
        target
      );

      await sendToLog(
        `${message.u.username} has rescinded the warning against ${target}.`,
        BOT
      );
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`rescind\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

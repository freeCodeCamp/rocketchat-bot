import { driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { CommandInt } from "../interfaces/CommandInt";

export const warn: CommandInt = {
  name: "warn",
  description: "Issues a warning to a user. Restricted to moderators.",
  parameters: ["user", "...reason"],
  usage: [
    "`{prefix} warn user reason` - will issue a DM warning to the `user` for the given `reason` and log the action in the log channel.",
  ],
  modCommand: true,
  command: async (message, room, BOT) => {
    try {
      /**
       * While this should not be possible (it is confirmed
       * in the command handler), return early if the message does
       * not have a user author to make TypeScript happy.
       */
      if (!message.u) {
        await driver.sendToRoom("Oops I broke it.", room);
        return;
      }

      const modCheck = await isModerator(message.u.username, BOT);

      if (!modCheck) {
        await driver.sendToRoom(
          "Sorry, but this command is locked to moderators.",
          room
        );
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [target, ...reasonArgs] = message.msg!.split(" ").slice(2);

      const isTargetMod = await isModerator(target, BOT);

      if (isTargetMod) {
        await driver.sendToRoom(
          "Sorry, but you cannot use this command on a fellow moderator.",
          room
        );
        return;
      }

      const reason = reasonArgs.join(" ");

      if (!reason) {
        await driver.sendToRoom(
          "Sorry, but would you please provide the reason for this action?",
          room
        );
        return;
      }

      const warning = `${message.u.username} has warned you for:\n${reason}.\nPlease remember to follow our [Code of Conduct](https://freecodecamp.org/news/code-of-conduct).`;

      await driver.sendDirectToUser(warning, target);

      await sendToLog(
        `${message.u.username} warned ${target} for: ${reason}.`,
        BOT
      );
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`warn\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

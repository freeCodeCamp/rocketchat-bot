import { driver } from "@rocket.chat/sdk";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { CommandInt } from "../interfaces/CommandInt";

export const warn: CommandInt = {
  name: "warn",
  description: "Issues a warning to a user. Restricted to moderators.",
  command: async (message, room, bot) => {
    if (!message.u) {
      await driver.sendToRoom("Oops I broke it.", room);
      return;
    }
    const modCheck = await isModerator(message.u.username, bot);

    if (!modCheck) {
      await driver.sendToRoom(
        "Sorry, but this command is locked to moderators.",
        room
      );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [target, ...reason] = message.msg!.split(" ").slice(2);

    const warning = `${message.u.username} has warned you for ${reason.join(
      " "
    )}. Please remember to follow our Code of Conduct.`;

    await driver.sendDirectToUser(warning, target);

    await sendToLog(`${message.u.username} warned ${target}.`, bot);
  },
};

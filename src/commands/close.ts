import { driver } from "@rocket.chat/sdk";
import { isModerator } from "../helpers/isModerator";
import { CommandInt } from "../interfaces/CommandInt";

export const close: CommandInt = {
  name: "close",
  description: "Closes a channel created with the private command.",
  command: async (message, room, BOT): Promise<void> => {
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

    if (!room.startsWith("private-")) {
      await driver.sendToRoom(
        "Sorry, but I can only close channels created with my `private` command.",
        room
      );
      return;
    }
  },
};

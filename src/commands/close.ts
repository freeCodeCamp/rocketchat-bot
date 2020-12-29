import { api, driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { PrivateChannelDeleteInt } from "../interfaces/apiInt";
import { CommandInt } from "../interfaces/CommandInt";

export const close: CommandInt = {
  name: "close",
  description: "Closes a channel created with the private command.",
  parameters: [],
  usage: [
    "`{prefix} close` - will close the channel this command is called in, as long as the channel name starts with `private-`.",
  ],
  modCommand: true,
  command: async (message, room, BOT): Promise<void> => {
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

      if (!room.startsWith("private-")) {
        await driver.sendToRoom(
          "Sorry, but I can only close channels created with my `private` command.",
          room
        );
        return;
      }

      const deleteChannel: PrivateChannelDeleteInt = await api.post(
        "groups.delete",
        { roomName: room }
      );

      if (!deleteChannel.success) {
        await driver.sendToRoom("Sorry, but I cannot do that right now.", room);
        return;
      }

      await sendToLog(
        `${message.u.username} closed and deleted the ${room} channel.`,
        BOT
      );
      return;
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`close\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

import { api, driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import {
  ChannelInviteInt,
  RoomInfoInt,
  UserInfoInt,
} from "../interfaces/apiInt";
import { CommandInt } from "../interfaces/CommandInt";

export const add: CommandInt = {
  name: "add",
  description: "Adds a user to the room the command is called in",
  parameters: ["user"],
  usage: [
    "`{prefix} add user` - Will add the `user` to the room the command is called in.",
  ],
  modCommand: true,
  command: async (message, room, BOT) => {
    try {
      if (!message.u || !message.msg) {
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

      const [target] = message.msg.split(" ").slice(2);

      const userInfoRequest: UserInfoInt = await api.get("users.info", {
        username: target,
      });

      const roomInfoRequest: RoomInfoInt = await api.get("rooms.info", {
        roomName: room,
      });

      const didAdd: ChannelInviteInt = await api.post("channels.invite", {
        roomId: roomInfoRequest.room._id,
        userId: userInfoRequest.user._id,
      });

      if (!didAdd || !didAdd.success) {
        await driver.sendToRoom("Sorry, but I cannot do that right now.", room);
        return;
      }
      const notice = `${message.u.username} has added you to #${room}.`;

      await driver.sendDirectToUser(notice, target);

      await sendToLog(
        `${message.u.username} has added ${target} to #${room}`,
        BOT
      );
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`add\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

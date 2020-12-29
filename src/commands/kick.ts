import { api, driver } from "@rocket.chat/sdk";
import { logBotMessage } from "../helpers/botLogging";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { RoomInfoInt, UserInfoInt, ChannelKickInt } from "../interfaces/apiInt";
import { CommandInt } from "../interfaces/CommandInt";

export const kick: CommandInt = {
  name: "kick",
  description: "Kicks a user from the room.",
  parameters: ["user", "...reason"],
  usage: [
    "`{prefix} kick user reason` - will kick the `user` from the room the command is called in, DM that `user` with the `reason` for the action, and log the action in the log channel.",
  ],
  modCommand: true,
  command: async (message, room, BOT) => {
    try {
      if (!message.u) {
        return;
      }

      if (!message.msg) {
        return;
      }

      const [target, ...reasonArgs] = message.msg.split(" ").slice(2);

      const reason = reasonArgs.join(" ");

      if (!reason) {
        await driver.sendToRoom(
          "Sorry, but would you please provide the reason for taking this action?",
          room
        );
        return;
      }

      const isMod = await isModerator(message.u.username, BOT);

      if (!isMod) {
        driver.sendToRoom(
          "Sorry, but this command is restricted to moderators.",
          room
        );
        return;
      }

      const isTargetMod = await isModerator(target, BOT);

      if (isTargetMod) {
        await driver.sendToRoom(
          "Sorry, but you cannot use this command on a fellow moderator.",
          room
        );
        return;
      }

      const userInfoRequest: UserInfoInt = await api.get("users.info", {
        username: target,
      });

      const roomInfoRequest: RoomInfoInt = await api.get("rooms.info", {
        roomName: room,
      });

      const didKick: ChannelKickInt = await api.post("channels.kick", {
        userId: userInfoRequest.user._id,
        roomId: roomInfoRequest.room._id,
      });

      if (!didKick || !didKick.success) {
        await driver.sendToRoom("Sorry, but I cannot do that right now.", room);
        return;
      }

      const notice = `${message.u.username} has kicked you from #${room} for:\n${reason}\nPlease remember to follow our [code of conduct](https://freecodecamp.org/news/code-of-conduct).`;

      await driver.sendDirectToUser(notice, target);

      await sendToLog(
        `${message.u.username} has kicked ${target} from #${room} for: ${reason}`,
        BOT
      );
    } catch (err) {
      await logBotMessage(
        `${room} had an error with the \`kick\` command. Check the logs for more info.`,
        BOT
      );
      console.error(err);
    }
  },
};

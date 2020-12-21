import { api, driver } from "@rocket.chat/sdk";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { RoomInfoInt, UserInfoInt, ChannelKickInt } from "../interfaces/apiInt";
import { CommandInt } from "../interfaces/CommandInt";

export const kick: CommandInt = {
  name: "kick",
  description: "Kicks a user from the room.",
  modCommand: true,
  command: async (message, room, BOT) => {
    if (!message.u) {
      return;
    }

    if (!message.msg) {
      return;
    }

    const [target, ...reason] = message.msg.split(" ").slice(2);

    const isMod = await isModerator(message.u.username, BOT);

    if (!isMod) {
      driver.sendToRoom(
        "Sorry, but this command is restricted to moderators.",
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

    if (!didKick.success) {
      await driver.sendToRoom("Sorry, but I cannot do that right now.", room);
      return;
    }

    const notice = `${
      message.u.username
    } has kicked you from the #${room} for:\n${reason.join(
      " "
    )}\nPlease remember to follow our [code of conduct](https://freecodecamp.org/news/code-of-conduct).`;

    await driver.sendDirectToUser(notice, target);

    await sendToLog(
      `${
        message.u.username
      } has kicked ${target} from #${room} for: ${reason.join(" ")}`,
      BOT
    );
  },
};

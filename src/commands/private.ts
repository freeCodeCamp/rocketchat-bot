import { driver } from "@rocket.chat/sdk";
import fetch from "node-fetch";
import { getModerators } from "../helpers/getModerators";
import { isModerator } from "../helpers/isModerator";
import { sendToLog } from "../helpers/sendToLog";
import { PrivateChannelCreateInt } from "../interfaces/apiInt";
import { CommandInt } from "../interfaces/CommandInt";

export const priv: CommandInt = {
  name: "private",
  description: "Creates a private room with a user and the moderator team",
  command: async (message, room, BOT) => {
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
    const target = message.msg!.split(" ").slice(2);

    if (!target) {
      await driver.sendToRoom(
        "Sorry, but who did you want to create a private room for?",
        room
      );
      return;
    }

    const moderatorTeam = await getModerators(BOT);

    const privateChannelRequest = await fetch(
      `http://${BOT.hostPath}/api/v1/groups.create`,
      {
        method: "POST",
        headers: {
          "X-Auth-Token": BOT.botToken,
          "X-User-ID": BOT.botId,
          "Content-Type": "application/json",
        },
        body: `{ "name": "private-${target}", "members": ${JSON.stringify(
          moderatorTeam.concat(target)
        )} }`,
      }
    );

    const privateChannelResponse: PrivateChannelCreateInt = await privateChannelRequest.json();

    if (!privateChannelResponse.success) {
      await driver.sendToRoom("Sorry, but I could not do that.", room);
      return;
    }

    await sendToLog(
      `${message.u.username} created a private discussion with ${target}.`,
      BOT
    );
  },
};

import dotenv from "dotenv";
import { api, driver } from "@rocket.chat/sdk";
import { CommandHandler } from "./commands/_CommandHandler";
import { BotInt } from "./interfaces/BotInt";

dotenv.config();

const { HOST, USER, PASS, BOTNAME, LOG_CHANNEL } = process.env;
const ROOMS = (process.env.ROOMS_TO_JOIN || "general").split(",");

if (!HOST || !USER || !PASS || !BOTNAME) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

export const BOT: BotInt = {
  botId: "",
  botName: BOTNAME,
  hostPath: HOST,
  logChannel: LOG_CHANNEL || "",
  prefix: process.env.PREFIX || "!bot",
  modRoles: process.env.ROLE_LIST?.split(",") || ["none"],
};

/**
 * The primary driver to run the bot.
 */
const runBot = async () => {
  // Connect to server, log in.
  await driver.connect({ host: HOST, useSsl: false });
  BOT.botId = await driver.login({ username: USER, password: PASS });

  // Auth to REST API
  await api.login({ username: USER, password: PASS });

  // Join configured rooms.
  await driver.joinRooms(ROOMS);
  console.log("joined rooms");

  // Listen for messages.
  const subscribed = await driver.subscribeToMessages();
  console.log(subscribed);

  // Pass received messages to command handler
  await driver.reactToMessages(CommandHandler);
  console.log("connected and waiting for messages");

  //greet
  await driver.sendToRoom(
    `\`${BOTNAME}\` is online!`,
    BOT.logChannel || ROOMS[0]
  );
  console.log("Greeting message sent.");
};

runBot();

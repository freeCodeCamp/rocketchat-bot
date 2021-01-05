import dotenv from "dotenv";
import { api, driver } from "@rocket.chat/sdk";
import { CommandHandler } from "./commands/_CommandHandler";
import { BotInt } from "./interfaces/BotInt";

dotenv.config();

const {
  ROCKETCHAT_URL,
  ROCKETCHAT_USER,
  ROCKETCHAT_PASSWORD,
  BOTNAME,
  MOD_LOG_CHANNEL,
  BOT_LOG_CHANNEL,
  BOT_RATE_LIMIT,
} = process.env;
const ROOMS = (process.env.ROCKETCHAT_ROOM || "general")
  .split(",")
  .map((el) => el.trim());

if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD || !BOTNAME) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

if (!MOD_LOG_CHANNEL || !BOT_LOG_CHANNEL) {
  console.warn(
    "Missing log channel settings. Logging will be disabled for this instance!"
  );
}

export const BOT: BotInt = {
  botId: "",
  botName: BOTNAME,
  hostPath: ROCKETCHAT_URL,
  modLogChannel: MOD_LOG_CHANNEL || "",
  botLogChannel: BOT_LOG_CHANNEL || "",
  version:
    process.env.HEROKU_RELEASE_VERSION ||
    "Unknown Heroku release version. Is this a local instance?",
  prefix: process.env.PREFIX || "!bot",
  modRoles: process.env.ROLE_LIST?.split(",").map((el) => el.trim()) || [
    "none",
  ],
  botRateLimit: parseInt(BOT_RATE_LIMIT || "10"),
  lastCommandCalled: 0,
};

/**
 * The primary driver to run the bot.
 */
const runBot = async () => {
  const ssl = process.env.ROCKETCHAT_USE_SSL ? true : false;
  // Connect to server, log in.
  await driver.connect({ host: ROCKETCHAT_URL, useSsl: ssl });
  BOT.botId = await driver.login({
    username: ROCKETCHAT_USER,
    password: ROCKETCHAT_PASSWORD,
  });

  // Auth to REST API
  await api.login({ username: ROCKETCHAT_USER, password: ROCKETCHAT_PASSWORD });

  // Join configured rooms.
  await driver.joinRooms(ROOMS.concat([BOT.modLogChannel, BOT.botLogChannel]));
  console.log("joined rooms");

  // Listen for messages.
  const subscribed = await driver.subscribeToMessages();
  console.log(subscribed);

  // Pass received messages to command handler
  await driver.reactToMessages(CommandHandler);
  console.log("connected and waiting for messages");

  //greet
  await driver.sendToRoom(
    `\`${BOTNAME}\` is online and running version: \`${BOT.version}\`!`,
    BOT.botLogChannel || ROOMS[0]
  );
  console.log("Greeting message sent.");
};

runBot();

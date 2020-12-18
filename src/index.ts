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
};

const runbot = async () => {
  // Connect to server, log in.
  await driver.connect({ host: HOST, useSsl: false });
  BOT.botId = await driver.login({ username: USER, password: PASS });

  // Auth to REST API
  const apiAuthRequest = await api.login({ username: USER, password: PASS });

  // Join configured rooms.
  await driver.joinRooms(ROOMS);
  console.log("joined rooms");

  // Listen for messages.
  const subscribed = await driver.subscribeToMessages();
  console.log(subscribed);

  // connect processMessages callback
  await driver.reactToMessages(CommandHandler);
  console.log("connected and waiting for messages");

  //greet
  await driver.sendToRoom(`${BOTNAME} is listening...`, ROOMS[0]);
  console.log("Greeting message sent.");
};

runbot();

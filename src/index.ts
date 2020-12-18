import dotenv from "dotenv";
import { driver } from "@rocket.chat/sdk";
import { CommandHandler } from "./commands/_CommandHandler";
import { BotInt } from "./interfaces/BotInt";
import fetch from "node-fetch";
import { LoginResponseInt } from "./interfaces/apiInt";

dotenv.config();

const { HOST, USER, PASS, BOTNAME, LOG_CHANNEL } = process.env;
const ROOMS = ["general", "test"];

if (!HOST || !USER || !PASS || !BOTNAME) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

export const BOT: BotInt = {
  botId: "",
  botName: BOTNAME,
  botToken: "",
  hostPath: HOST,
  logChannel: LOG_CHANNEL || "",
  prefix: process.env.PREFIX || "!bot",
};

const runbot = async () => {
  // Connect to server, log in.
  await driver.connect({ host: HOST, useSsl: false });
  BOT.botId = await driver.login({ username: USER, password: PASS });

  // Auth to REST API
  const apiAuthRequest = await fetch(`http://${BOT.hostPath}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{ "user": "${USER}", "password": "${PASS}" }`,
  });
  const apiAuthResponse: LoginResponseInt = await apiAuthRequest.json();
  console.log(apiAuthResponse);
  BOT.botToken = apiAuthResponse.data.authToken;

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

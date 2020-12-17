import dotenv from "dotenv";
import { driver } from "@rocket.chat/sdk";
import { IMessage } from "./interfaces/rocketChat";

dotenv.config();

const { HOST, USER, PASS, BOTNAME } = process.env;
const ROOMS = ["general", "test"];

if (!HOST || !USER || !PASS || !BOTNAME) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

let myuserid;

const runbot = async () => {
  const connection = await driver.connect({ host: HOST, useSsl: false });
  myuserid = await driver.login({ username: USER, password: PASS });
  const roomsJoined = await driver.joinRooms(ROOMS);
  console.log("joined rooms");

  // listen to rooms
  const subscribed = await driver.subscribeToMessages();
  console.log(subscribed);

  // connect processMessages callback
  const msgloop = await driver.reactToMessages(processMessages);
  console.log("connected and waiting for messages");

  //greet
  const sent = await driver.sendToRoom(`${BOTNAME} is listening...`, ROOMS[0]);
  console.log("Greeting message sent.");
};

const processMessages = async (err, messages: IMessage[], messageOptions) => {
  if (err) {
    console.error(err);
    return;
  }
  const message = messages[0];
  if (message.u?._id === myuserid) {
    return;
  }
  console.log(message);
  const roomname = await driver.getRoomName(message.rid || "general");
  if (message.msg?.toLowerCase().startsWith(BOTNAME)) {
    const response = `${
      message.u?.username
    }, how can ${BOTNAME} help you with ${message.msg.substr(
      BOTNAME.length + 1
    )}`;
    const sentmsg = await driver.sendToRoom(response, roomname);
  }
};

runbot();

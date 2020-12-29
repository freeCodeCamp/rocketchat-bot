import { IMessage } from "@rocket.chat/sdk/dist/config/messageInterfaces";
import { BotInt } from "./BotInt";

export interface CommandInt {
  name: string;
  description: string;
  parameters: string[];
  usage: string[];
  modCommand: boolean;
  /**
   * The function that executes when the command `name` is passed in the message.
   * @param {IMessage} message The message object to run the command against.
   * @param {string} room The name of the room the message was received in.
   * @param {BotInt} BOT The bot configuration object.
   * @returns {Promise<void>} a void promise
   */
  command: (message: IMessage, room: string, BOT: BotInt) => Promise<void>;
}

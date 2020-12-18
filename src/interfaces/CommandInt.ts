import { IMessage } from "@rocket.chat/sdk/dist/config/messageInterfaces";
import { BotInt } from "./BotInt";

export interface CommandInt {
  name: string;
  description: string;
  command: (message: IMessage, room: string, bot: BotInt) => Promise<void>;
}

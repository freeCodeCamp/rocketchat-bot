import { IMessage } from "@rocket.chat/sdk/dist/config/messageInterfaces";

export interface MessageInt extends IMessage {
  replies?: string[];
}

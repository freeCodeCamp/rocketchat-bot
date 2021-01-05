export interface BotInt {
  botId: string;
  botName: string;
  hostPath: string;
  modLogChannel: string;
  botLogChannel: string;
  version: string;
  prefix: string;
  modRoles: string[];
  botRateLimit: number;
  lastCommandCalled: number;
}

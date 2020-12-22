import { CommandInt } from "../interfaces/CommandInt";
import { algo } from "./algo";
import { close } from "./close";
import { coc } from "./coc";
import { eightball } from "./eightball";
import { help } from "./help";
import { kick } from "./kick";
import { modHelp } from "./modHelp";
import { ping } from "./ping";
import { priv } from "./private";
import { quote } from "./quote";
import { resources } from "./resources";
import { warn } from "./warn";

/**
 * Construct an array of the commands for the handler
 * to iterate through
 */
export const CommandList: CommandInt[] = [
  coc,
  help,
  resources,
  warn,
  priv,
  close,
  quote,
  eightball,
  algo,
  kick,
  modHelp,
  ping,
];

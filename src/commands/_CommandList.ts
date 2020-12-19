import { CommandInt } from "../interfaces/CommandInt";
import { close } from "./close";
import { coc } from "./coc";
import { help } from "./help";
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
];

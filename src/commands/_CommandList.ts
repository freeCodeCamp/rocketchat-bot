import { CommandInt } from "../interfaces/CommandInt";
import { close } from "./close";
import { coc } from "./coc";
import { help } from "./help";
import { priv } from "./private";
import { resources } from "./resources";
import { warn } from "./warn";

export const CommandList: CommandInt[] = [
  coc,
  help,
  resources,
  warn,
  priv,
  close,
];

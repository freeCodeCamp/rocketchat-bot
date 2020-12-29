import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";

export const coc: CommandInt = {
  name: "coc",
  description: "Returns information on the Code of Conduct.",
  parameters: [],
  usage: [
    "`{prefix} coc` - will return a summarised version of the freeCodeCamp Code of Conduct.",
  ],
  modCommand: false,
  command: async (_message, room) => {
    const codeOfConduct = `*freeCodeCamp Code of Conduct*
These are the basic rules for interacting with the FreeCodeCamp community on any platform, including this chat server. You can read the full document on the [FreeCodeCamp article](https://freecodecamp.org/news/code-of-conduct).
*No Harassment*: Harassment includes sexual language and imagery, deliberate intimidation, stalking, name-calling, unwelcome attention, libel, and any malicious hacking or social engineering. freeCodeCamp should be a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, national origin, or religion (or lack thereof).
*No Trolling*: Trolling includes posting inflammatory comments to provoke an emotional response or disrupt discussions.
*No Spamming*: Spamming includes posting off-topic messages to disrupt discussions, promoting a product, soliciting donations, advertising a job / internship / gig, or flooding discussions with files or text.
Thank you for following freeCodeCamp's Code of Conduct.
`;
    await driver.sendToRoom(codeOfConduct, room);
  },
};

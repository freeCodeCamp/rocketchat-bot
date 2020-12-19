import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";

export const resources: CommandInt = {
  name: "resources",
  description: "Returns a list of helpful links",
  command: async (_message, room) => {
    const coc =
      "[freeCodeCamp Code of Conduct](https://freecodecamp.org/news/code-of-conduct) - The set of rules we apply to all of our community platforms.";
    const mod =
      "[Moderator Handbook](https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook) - The guidelines our team follows when moderating the community.";
    const contrib =
      "[Contributing Guidelines](https://contribute.freecodecamp.org/) - Instructions for contributing to the freeCodeCamp codebase, platforms, and community.";
    const news =
      "[News Contributing](https://www.freecodecamp.org/news/developer-news-style-guide/) - Instructions specifically for becoming an author on our `/news` platform.";
    const prs =
      "[Pull Requests](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse) - A list of GitHub pull requests that are ready for review (not in draft, not blocked, passing all CI checks).";
    const header = "Here are some helpful links for you!";
    const response = `${header}\n${coc}\n${mod}\n${contrib}\n${news}\n${prs}`;
    await driver.sendToRoom(response, room);
  },
};

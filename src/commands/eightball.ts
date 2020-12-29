import { driver } from "@rocket.chat/sdk";
import { CommandInt } from "../interfaces/CommandInt";

export const eightball: CommandInt = {
  name: "eightball",
  description: "Answers your question with a Magic Eightball phrase.",
  parameters: ["...question"],
  usage: [
    "`{prefix} eightball question` - will return a magic eightball response for the given `question`.",
  ],
  modCommand: false,
  command: async (message, room) => {
    const options = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "It is certain.",
      "It is decidedly so.",
      "Most likely.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Outlook good.",
      "Reply hazy, try again.",
      "Signs point to yes.",
      "Very doubtful.",
      "Without a doubt.",
      "Yes.",
      "Yes - definitely.",
      "You may rely on it.",
    ];
    const randomIndex = Math.floor(Math.random() * options.length);
    const [...question] = message.msg!.split(" ").slice(2);

    if (!question || !question.length) {
      await driver.sendToRoom(
        "Sorry, but what question did you want me to answer?",
        room
      );
      return;
    }

    const response = `*Question:* ${question.join(" ")}\n*Response:*${
      options[randomIndex]
    }`;
    await driver.sendToRoom(response, room);
  },
};

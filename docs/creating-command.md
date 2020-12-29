# Adding a New Command

Adding a new command requires a few steps. First, create a new file in the `/src/commands` directory called `commandName.ts` (where `commandName` is the name of your command).

## Writing the Command

Commands use the same `CommandInt` interface, which can be found in `src/interfaces/CommandInt.ts`. A command should be exported to be accessed by the handler.

NOTE: `CommandInt` will need to be imported.

```ts
export const commandName: CommandInt = {
  name: "The name of your command (used to call the command)",
  description: "A brief description of the command, displayed in the help commands.",
  parameters: ["required", "?optional", "...multi-word"] /*Array of command parameters*/,
  usage: [
    "`{prefix} commandName required` - Does something",
    "`{prefix} commandName required ?optional` - Does something extra",
  ], /* Example use cases. The {prefix} is replaced with the bot's actual prefix automatically */
  modCommand: false,
  command: async (message, room, BOT) => {
      /* Command logic will go here */
  }
```

Commands use a global error-handling logic, which relies on a try/catch around the command logic and a helper function for logging errors. The `logBotMessage` (which needs to be imported) will handle sending a notice to the bot's log channel.

```ts
command: async (message, room, BOT) => {
  try {
    /* Command logic will go here */
  } catch (err) {
    await logBotMessage(
      `${room} had an error with the \`commandName\` command. Check the logs for more info.`,
      BOT
    );
    console.error(err);
  }
};
```

## Importing the Command

Once you have written your command's logic, you will need to import that new command through the `/src/commands/_CommandList.ts` file. To the existing `CommandList` array, add your new `commandName` command (remember that it must be imported if your IDE does not do so automatically).

```ts
export const CommandList: CommandInt[] = [
  aCommand,
  anotherCommand,
  commandName // This is your command!
];
```

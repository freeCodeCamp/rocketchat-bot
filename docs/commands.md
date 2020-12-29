# Commands

The bot currently has the following commands. Commands must be prefixed with...

## Public Commands

These commands are available to all users.

- `algo`: Returns a random freeCodeCamp algorithm challenge.
- `coc`: Returns a brief version of the freeCodeCamp Code of Conduct, with a link to the full article.
- `eightball <...question>`: Returns a response from a Magic 8-Ball toy for the given `question`.
- `help <?command>`: Returns a list of the bot's available commands, or a detailed description of the specific `command`.
- `ping`: Returns a message with the bot's response time in milliseconds.
- `quote`: Returns a random motivational quote from freeCodeCamp's curated list.
- `resources`: Returns a list of helpful freeCodeCamp resources.

## Private Commands

These commands are locked to moderators.

- `add <username>`: This command will add the `username` to the room it was called in. The command will log the action to the log channel and send a DM to the user to let them know they are in a new room.
- `close`: This command will close (delete) the channel it is used in, as long as that channel was created with the `private` command (channel name starts with "private-").
- `kick <username> <...reason>`: This command kicks the `username` from the room it was called in. The command will log the action to the log channel, and send a DM to the user informing them of the `reason` for the kick.
- `modHelp <?command>`: This command returns a list of the bot's available moderation commands, or a detailed description of the specific `command`.
- `private <username>`: This command will create a new private room with the `username` user and all members of the moderator team.
- `warn <username> <...reason>`: This command sends a DM warning the `username` user for the given `reason`. The bot will send a log to the provided log channel.

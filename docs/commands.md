# Commands

The bot currently has the following commands. Commands must be prefixed with...

## Public Commands

These commands are available to all users.

- `coc`: Returns a brief version of the freeCodeCamp Code of Conduct, with a link to the full article.
- `help`: Returns a list of the bot's available commands.
- `quote`: Returns a random motivational quote from freeCodeCamp's curated list.
- `resources`: Returns a list of helpful freeCodeCamp resources.

## Private Commands

These commands are locked to moderators.

- `close`: This command will close (delete) the channel it is used in, as long as that channel was created with the `private` command (channel name starts with "private-").
- `private <username>`: This command will create a new private room with the `username` user and all members of the moderator team.
- `warn <username> <reason>`: This command sends a DM warning the `username` user for the given `reason`. The bot will send a log to the provided log channel.

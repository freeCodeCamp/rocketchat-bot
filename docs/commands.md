# Commands

The bot currently has the following commands. Commands must be prefixed with...

## Public Commands

These commands are available to all users.

- `coc`: Returns a brief version of the freeCodeCamp Code of Conduct, with a link to the full article.
- `help`: Returns a list of the bot's available commands.
- `resources`: Returns a list of helpful freeCodeCamp resources.

## Private Commands

These commands are locked to moderators.

- `private <username>`: This command will create a new private room with the `username` user and all members of the moderator team.
- `warn <username> <reason>`: This command sends a DM warning the `username` user for the given `reason`. The bot will send a log to the provided log channel.

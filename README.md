# koiwai
A Discord bot that uses a more conversational command structure

[![Discord Bots](https://discordbots.org/api/widget/status/417135939773661214.svg)](https://discordbots.org/bot/417135939773661214) [![Discord Bots](https://discordbots.org/api/widget/lib/417135939773661214.svg?noavatar=true)](https://discordbots.org/bot/417135939773661214) [![Discord Bots](https://discordbots.org/api/widget/owner/417135939773661214.svg?noavatar=true)](https://discordbots.org/bot/417135939773661214)

## About the bot
Standard Discord bots look for a prefix before they start processing their commands. Instead of following this structure, Koiwai looks for its name or a mention in message as well as keywords for each command and responds. This allows users to structure their commands to the bot in a more free-form manner rather than using the same specific commands over and over.

## Currently implemented features
Koiwai is still in its early stages, so the commands are simple and limited. Here is a list of commands and the keywords to trigger them.

* Ready - Koiwai will tell you whether or not it is ready. This allows you to easily check whether or not the bot is online. (Ready)
* Who is __? - generate a usercard with a little information about a user. (Who am I, Who is)
* Quote - Returns a random anime quote. There aren't many quotes impelented now, so please submit any suggestions. (Quote)
* Google - Generates a LMGTFY link for people who don't know how to use Google. Include your search term in angle brackets (<>). (Google, Search)
* Gratitude - Always remember to be polite to your bots. Koiwai will respond if you thank him. (Thanks, Thank you)
* Help - Links back to this page. (Help, About, Info)

## Features to be implemented
If you have a suggestion for a feature to add, let me know and I'll do my best to add it to the bot.

## Inviting Koiwai
[Koiwai is available to add to your server from here.](https://discordapp.com/api/oauth2/authorize?client_id=417135939773661214&permissions=378944&scope=bot) If you notice any issues, you can open a bug report here, let me know on [Twitter](https://twitter.com/jacenboy), or join my [Discord server](https://discord.gg/4Zt9da3).

## Hosting Koiwai
If you want to host Koiwai yourself, you are free to do so, but I don't plan on creating a fancy tutorial to show you how.

If you plan to host the bot yourself, make sure you set up config.json correctly. Here's an overview of what needs to be filled in.

* token: The token for the bot user you plan to use. Make sure to keep this secret.
* prefix: As Koiwai doesn't use a prefix, this field isn't used. It's kept around in case I decide to add some prefixed commands.
* botname: This is the name that your bot will respond to. Make sure to enter it in all lowercase.
* ownerid: Your user id. This will allow you to access the owner exclusive commands.

Koiwai has a handful of commands usable only to the bot's owner.

* Stop - Stops the bot. (Stop)
* Version - Gets the bot's current version number. (Version)
* Debug Logging - Enables/disables additional logging information. (Logging enable/disable)
* Log - Manually adds a note in the console log. Place your note in backticks (\`). (Log)
* Eval - Runs an eval on the code you specify. Place the code in backticks (\`). (eval)

You can blacklist servers and server owners from adding Koiwai to their servers. Simply add their user/server id into the correct spot in the blacklist.json file.

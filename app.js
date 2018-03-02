const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const quotes = require("./quotes.json");
var logging = false;



client.on('ready', () => {
	console.log("Logged in as " + client.user.tag);
});

client.on("guildCreate", (guild) => {
	console.log("Added to new server: " + guild.name);
});

client.on("guildDelete", (guild) => {
	console.log("Removed from server: " + guild.name);
});

client.on("message", (message) => {
	// Ignore commands from other bots
	if (message.author.bot) return;
	
	// If Koiwai is mentioned by name, start checking the commands
	if (message.content.toLowerCase().search(config.botname) != -1 || message.content.toLowerCase().search(client.user.id) != -1) {
		
		// Owner commands - Commands only usable by the bot owner
		if (message.author.id == (config.ownerid || "116984247641833475")) {
			
			// Version - Get the current version of the bot
			if (message.content.toLowerCase().search("version") != -1) {
				message.channel.send("The current bot version is " + process.env.npm_package_version);
			}
			
			// Debug Logging - Enable/disable more complete logging for debugging purposes
			// Itsuki will have this enabled by default; Koiwai will have this disabled by default
			if (message.content.toLowerCase().search("logging") != -1) {
				if (message.content.toLowerCase().search("enable") != -1) {
					if (logging) {
						message.channel.send("Debug logging is already enabled.");
					}
					else {
						logging = true;
						message.channel.send("Debug logging is enabled.");
					}
				} else if (message.content.toLowerCase().search("disable") != -1) {
					if (logging) {
						logging = false;
						message.channel.send("Debug logging is disabled.");
					} else {
						message.channel.send("Debug logging is already disabled.");
					}
				}
				return;
			}
			
			// Log - Make a note in the console
			if (message.content.toLowerCase().search("log") != -1) {
				var logstart = message.content.indexOf("`");
				var logend = message.content.lastIndexOf("`");
				var logcontent = message.content.slice(logstart + 1, logend);
				console.log("Owner log: " + logcontent);
				message.channel.send("Your message has been logged.");
				return;
			}
			
			// Eval - Run node.js code straight from Discord
			if (message.content.toLowerCase().search("eval") != -1) {
				//console.log(message.content);
				
				var evalstart = message.content.indexOf("`");
				var evalend = message.content.lastIndexOf("`");
				var evalcontent = message.content.slice(evalstart + 1, evalend);
				console.log("eval triggered: " + evalcontent);
				
				try {
					let evaled = eval(evalcontent);
					
					if (typeof evaled !== "string") {
						evaled = require("util").inspect(evaled);
					}
					
					message.channel.send(clean(evaled), {code:"xl"});
					console.log("eval output: " + clean(evaled));
				}
				catch (err) {
					var evalout = message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
					console.log("eval error: " + clean(err));
				}
				return;
			}
			
			// Stop command - Kill the bot
			if (message.content.toLowerCase().search("stop") != -1) {
				message.channel.send("The bot will now stop.");
				console.log("Bot will now stop");
				process.exit();
			}
		}
		
		
		
		// Ready command - Koiwai will respond if he is online
		if (message.content.toLowerCase().search("ready") != -1) {
			message.channel.send("I am ready.");
			return;
		}
		
		// Who am I? - Return a usercard about yourself
		if (message.content.toLowerCase().search("who am i") != -1) {
			var whoauthor = message.author;
			if (whoauthor.bot) {
				var botstatus = "Is a bot";
			} else {
				var botstatus = "Not a bot";
			}
			var embed = {
				"title": whoauthor.username,
				  "color": 9507863,
				  "thumbnail": {
					"url": whoauthor.displayAvatarURL
				  },
				  "fields": [
					{
					  "name": "-Bot Status",
					  "value": botstatus
					},
					{
					  "name": "-Account Created",
					  "value": whoauthor.createdAt
					},
					{
					  "name": "-Discrimitator",
					  "value": "#" + whoauthor.discriminator
					},
					{
					  "name": "-Status",
					  "value": whoauthor.presence.status
					}
				  ]
				};
			message.channel.send({ embed });
			return;
		}
		
		// Who is ___? - Return a usercard about another user
		if (message.content.toLowerCase().search("who is") != -1) {
			var whomember = message.mentions.members.first().user;
			if (whomember.bot) {
				var botstatus = "Is a bot";
			} else {
				var botstatus = "Not a bot";
			}
			var embed = {
				"title": whomember.username,
				  "color": 9507863,
				  "thumbnail": {
					"url": whomember.displayAvatarURL
				  },
				  "fields": [
					{
					  "name": "-Bot Status",
					  "value": botstatus
					},
					{
					  "name": "-Account Created",
					  "value": whomember.createdAt
					},
					{
					  "name": "-Discrimitator",
					  "value": "#" + whomember.discriminator
					},
					{
					  "name": "-Status",
					  "value": whomember.presence.status
					}
				  ]
				};
			message.channel.send({ embed });
			return;
		}
		
		// Quotes - Return a random anime quote from a predefined listStyleType
		if (message.content.toLowerCase().search("quote") != -1) {
			var quoteID = Math.floor(Math.random() * (quotes.length));
			const embed = {
				"description": quotes[quoteID].quote,
				"color": 2456743,
				"footer": {
					"text":"- " + quotes[quoteID].attrib
				}
			};
			message.channel.send({ embed });
			return;
		}
		
		// Google - Generates a LMGTFY link
		if (message.content.toLowerCase().search("google") != -1) {
			var searchstart = message.content.indexOf("<");
			var searchend = message.content.lastIndexOf(">");
			var searchterm = message.content.slice(searchstart + 1, searchend);
			message.channel.send("Let me Google that for you!\nhttp://lmgtfy.com/?q=" + searchterm.split(' ').join('+'));
			return;
		}
		
		// Gratitude - Koiwai will respond to "thank you" messages
		if (message.content.toLowerCase() == ("ty " + config.botname) || message.content.toLowerCase().search("thank you") != -1 || message.content.toLowerCase().search("thanks") != -1 ) {
			message.channel.send("You're welcome, " + message.author.username + ".");
			return;
		}
		
		// Help/Info - Link to the webpage that shows basic information about the bot
		if (message.content.toLowerCase().search("help") != -1 || message.content.toLowerCase().search("info") != -1 || message.content.toLowerCase().search("about") != -1) {
			message.channel.send("Here's an information page:\nhttps://github.com/JacenBoy/koiwai");
		}
	}
});

// Error handling
client.on("error", (e) => console.error(e));
client.on("warn", (e) => {if (logging) console.warn(e)});
client.on("debug", (e) => {if (logging) console.info(e)});



// Additional functions
function clean(text) {
	if (typeof(text) === "string") {
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	}
	else {
		return text;
	}
}



client.login(config.token);
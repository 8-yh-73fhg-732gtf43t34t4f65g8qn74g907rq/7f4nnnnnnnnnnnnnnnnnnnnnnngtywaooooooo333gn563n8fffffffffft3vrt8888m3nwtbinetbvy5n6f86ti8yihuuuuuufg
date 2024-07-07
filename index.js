const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const keepAlive = require('./server');
const colors = require("colors");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {

        

    },

    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});


const config = require('./settings/config');
keepAlive();
client.login(config.token);

module.exports = client;

client.slashCommands = new Collection();

client.on("ready", async () => {

    require('./handler')(client);

    const readyEvent = require('./events/client/ready');
    await readyEvent.execute(client);
});

process.on("unhandledRejection", (error) => {
    if (error.code == 10062) return; // Unknown interaction

    console.log(`[ERROR] ${error}`.red);
})
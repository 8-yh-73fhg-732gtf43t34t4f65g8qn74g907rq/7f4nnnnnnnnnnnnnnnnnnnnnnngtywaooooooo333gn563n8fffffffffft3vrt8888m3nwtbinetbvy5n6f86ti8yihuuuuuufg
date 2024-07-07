const colors = require('colors');
const { ActivityType } = require("discord.js");
const config = require('../../settings/config');
const { ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) is ready !`.green);
        
	const botStatus = [
		`${client.users.cache.size} Users`,
		`Living in Area ~ 51`,
		`By 𝔇𝔢𝔪𝔬𝔫(@0ixe)`,
	];

    setBotStatus();

    // Update the status every 5 seconds
    setInterval(setBotStatus, 5000);
        
	function setBotStatus() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
        client.user.setPresence({
            activities: [
                {
                    name: status,
                    type: ActivityType.Playing,
                },
            ],
            status: 'dnd',
        });
	}


        let channelTicket = client.channels.cache.get(config.ticket_channel);
        await channelTicket.send({ content: "." })
        await channelTicket.bulkDelete(2);

        await channelTicket.send({
            embeds: [{
                title: "Area 51 Tickets !",
                description: "To create a ticket press the button below **↓**",
                thumbnail: {
                    url: 'https://cdn.discordapp.com/avatars/1259269342764470282/3bf0f955e45232c9b0229eccd1efa8ff.webp?size=1024&format=webp&width=0&height=230'
                },
                color: Colors.Blurple,
                footer: {
                    name: "Area ~ 51",
                },
                timestamp: new Date(),
            }],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder().setCustomId('ticket').setEmoji('🎫') .setLabel('Create a Ticket') .setStyle(ButtonStyle.Primary)
                )
            ]
        })
    }
}

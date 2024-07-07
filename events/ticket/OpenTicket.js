const { ActionRowBuilder, ChannelType, Colors, ButtonBuilder, ButtonStyle, PermissionFlagsBits, } = require('discord.js')
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isStringSelectMenu()) return;

        let support_team = config.support_team;

        let AlreadyChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyChannel) return interaction.reply({
            content: ":x: | You already have a ticket open !",
            ephemeral: true
        });

        if(interaction.values[0] === 'report') {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    embeds: [{
                        content:'***<@&1252813575777419328>***',
                        title: "Area ~ 51 Tickting !",
                        description: `Welcome to your ticket ${interaction.user} !\nA staff member will be here to assist immediately <@&1252813575777419328>.`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Area ~ 51 Tickting"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} ***<@&1252813575777419328>*** <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        } 
        else if (interaction.values[0] === "question") {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    embeds: [{
                        title: "Area ~ 51 Tickting !",
                        description: `Welcome to your ticket ${interaction.user} !\nA staff member will be here to assist immediately <@&1252813575777419328>.`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Area ~ 51 Tickting"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} ***<@&1252813575777419328>*** <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        }
        else if (interaction.values[0] === "other") {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    embeds: [{
                        title: "Area ~ 51 Tickting !",
                        description: `Welcome to your ticket ${interaction.user} !\nA staff member will be here to assist immediately <@&1252813575777419328>.`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Area ~ 51 Tickting"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        }
    }
}

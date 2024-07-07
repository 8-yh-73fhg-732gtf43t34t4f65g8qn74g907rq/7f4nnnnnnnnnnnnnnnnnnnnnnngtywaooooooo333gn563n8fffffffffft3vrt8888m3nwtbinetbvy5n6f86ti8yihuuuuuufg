const { ActionRowBuilder, ChannelType, Colors, PermissionFlagsBits, StringSelectMenuBuilder } = require('discord.js')
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isButton()) return;

        if(interaction.customId == 'ticket') {
            
            let ticket = interaction.guild.channels.create({
                name: `Select a category`,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
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
                        description: "Please select a category for your ticket !",
                                        thumbnail: {
                                        url: 'https://cdn.discordapp.com/avatars/1259269342764470282/3bf0f955e45232c9b0229eccd1efa8ff.webp?size=1024&format=webp&width=0&height=230'
                },
                        color: Colors.Blurple,
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId('category')
                            .setPlaceholder('Select a category')
                            .addOptions([
                                {
                                    label: 'Report',
                                    description: 'Report a user',
                                    value: 'report',
                                    emoji: '🔴'
                                },
                                {
                                    label: 'Question',
                                    description: 'any question',
                                    value: 'question',
                                    emoji: '📝'
                                },
                                {
                                    label: 'Staff Apply',
                                    description: 'apply to be a staff member',
                                    value: 'other',
                                    emoji: '🛠️'
                                }
                            ])
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user}`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
            interaction.reply({
                content: `✅ | Your ticket has been created !`,
                ephemeral: true
            })
        }
    }
}
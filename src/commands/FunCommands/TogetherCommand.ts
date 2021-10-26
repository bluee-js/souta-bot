import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { choices } from '../../utils/Together';
import { Command } from '../../interfaces';

export const command: Command = {
	name: 'atividade',
	description: 'Inicie uma atividade em uma chamada de voz.',
	reqPerms: ['START_EMBEDDED_ACTIVITIES'],
 	testOnly: true,
	everyone: true,

	options: [
		{
			name: 'atividade',
			required: true,
			description: 'Qual atividade deseja iniciar.',
			type: 'STRING',
			choices,
		},
		{
			name: 'canal-de-voz',
			required: true,
			description: 'Em qual canal deseja iniciar a atividade.',
			type: 'CHANNEL',
			channelTypes: ['GUILD_VOICE'],
		},
	],

	run: async ({ client, interaction, args }) => {
		let voiceChannel = interaction.options.getChannel('canal-de-voz');
		let { name, value } = choices.find(act => act.value == args[0]);

		let invite = await voiceChannel.createInvite({
			targetApplication: value,
			targetType: 2,
		});
		let { url } = invite;

		let activityRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Iniciar Atividade')
					.setStyle('LINK')
					.setURL(url)
			);

		let activityEmbed = new MessageEmbed()
			.setDescription(`Você iniciou a atividade **\`${name}\`** no canal de voz ${voiceChannel}.`)
			.setColor(client.defaultHex);
		
		interaction.reply({ embeds: [activityEmbed], components: [activityRow] });
	},
};

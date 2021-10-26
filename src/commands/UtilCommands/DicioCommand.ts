import { Command } from '../../interfaces';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const command: Command = {
	name: 'dicio',
	description: 'Pesquise o significado de uma palavra no dicio.com.br.',
	testOnly: true,
	everyone: true,

	options: [
		{
			name: 'palavra',
			required: true,
			description: 'A palavra que terá seu significado.',
			type: 'STRING',
		},
	],

	run: async ({ client, interaction, args }) => {
		await interaction.deferReply();

    let word = args[0]
      .trim()
			.toLowerCase()
			.normalize('NFD')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Zs-\s--]/g, '');

		let url = `https://s.dicio.com.br/${word}.jpg`;
		let test;

		try {
			await axios.get(url);
			test = true;
		} catch (e) {
			test = false;
		}

		if (!test) {
			interaction.editReply({
				embeds: [
					client.embed.error(
						`Não foi possível encontrar a palavra \`${word}\` no dicionário.`
					),
				],
			});
			return;
		}

		let meanEmbed = new MessageEmbed()
			.setAuthor(
				'dicio.com.br',
				'https://www.dicio.com.br/img/yt/yt-thumb.png',
				'https://www.dicio.com.br/'
			)
			.setColor(client.defaultHex)
			.setImage(url);

		interaction.editReply({ embeds: [meanEmbed] });
	},
};

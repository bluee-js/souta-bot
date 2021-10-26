// import { units, hundreds, dozens } from '../../utils/NumberToWords';
import { Command } from '../../interfaces';
import extenso from 'extenso';
import { MessageEmbed } from 'discord.js';

export const command: Command = {
	name: 'números-por-extenso',
	description: 'Transforme números em por extenso. (Pode ser mais que 1)',
  testOnly: true,
  type: 'MESSAGE',

  run: async ({ client, interaction, target }) => {
    await interaction.deferReply({ ephemeral: true });

    let input = target.content;
    let numbers = input.match(/\d+/g);
    if (numbers) numbers = numbers.filter((_) => _ != 0);

		if (!numbers || !numbers.length) {
			interaction.editReply({
				embeds: [client.embed.error('Deve haver no mínimo um número.')],
			});
			return;
		}

		let s = numbers.length > 1 ? 's' : '';
		let output = input.replace(/(\d+)/g, ' $1 ').replace(/\s+/g, ' ').trim();
		let output2 = numbers
			.map((number) => {
				let ext = extenso(number);
				if (typeof ext != 'string') ext = ext.toString();
				return ext.capitalize();
			})
			.join(' / ')
			.crase();

		numbers.map((number) => (output = output.replace(number, extenso(number))));

		const numberEmbed = new MessageEmbed()
			.setTitle('Por extenso')
			.setDescription(`Segue abaixo o${s} número${s} por extenso:`)
			.addFields([
				{ name: 'Entrada', value: input.crase() },
				{ name: 'Por extenso', value: output.capitalize().crase() },
			])
			.setColor(client.defaultHex);

		if (isNaN(Number(input.replace(/\s/g, '')))) {
			numberEmbed.addField('Por extenso (apenas os números)', output2);
		}

    interaction.editReply({ embeds: [numberEmbed] });
	},
};

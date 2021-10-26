import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces';
import Canvas from 'canvas';

export const command: Command = {
	name: 'avatar',
	description: 'Obtenha o avatar de um usuário.',
	testOnly: true,

	options: [
		{ name: 'membro', required: false, description: 'Um membro do servidor.', type: 'USER' },
		{ name: 'id', required: false, description: 'Um id de qualquer usuário do Discord.', type: 'STRING' },
	],

	run: async ({ client, interaction, args }) => {
		let user;

		try {
			user = await client.users.fetch(args[0]);
		} catch {
			user = interaction.user;
		}

		const canvas = Canvas.createCanvas(1024, 1024);
		const ctx = canvas.getContext('2d');
		const avatar = user._avatar();

		ctx.beginPath();
		ctx.arc(512, 512, 512, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const canvasAvatar = await Canvas.loadImage(
			user.displayAvatarURL({ format: 'png', size: 1024 })
		);
		ctx.drawImage(canvasAvatar, 0, 0, 1024, 1024);

		const avatarEmbed = new MessageEmbed()
			.setTitle(`**Avatar de '${user.tag}'**`)
			.setDescription(`[Clique aqui para baixar o avatar](${avatar})`)
			.setImage(`attachment://${user.id}-pfp.png`)
			.setColor('BLURPLE');

		interaction.editReply({
			embeds: [avatarEmbed],
			files: [{ attachment: canvas.toBuffer(), name: `${user.id}-pfp.png` }],
		});
	},
};

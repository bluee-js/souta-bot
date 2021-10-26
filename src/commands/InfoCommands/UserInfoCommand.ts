import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces';

export const command: Command = {
	name: 'userinfo',
	description: 'Obtenha as informações gerais de um usuário ou membro.',
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

		let member = await interaction.guild.members.fetch(user.id);

		let nickname = member?.user.toString() ?? user.tag.bold();
		let { id, bot, banner, createdText } = user.userInfo();
		let inline = true;

		let mainEmbed = new MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user._avatar())
			.setDescription(`**Informações gerais de ${nickname}**`)
			.setThumbnail(`attachment://${user.id}-pfp.png`)
			.setColor('BLURPLE')
			.addFields([
				{ name: '🆔 ▏ID do Usuário', value: id, inline },
				{ name: '🤖 ▏Bot', value: bot, inline },
				{ name: '🕞 ▏Conta criada em', value: createdText },
			]);

		if (member) {
			let { joinedText, nickname, status, device, roles } = member.memberInfo();

			mainEmbed.addFields([
				{ name: '🕑 ▏Entrou no servidor em', value: joinedText },
				{ name: '👥 ▏Apelido', value: nickname, inline },
				{ name: '☑️ ▏Status', value: status, inline },
				{ name: '🖥️ ▏Dispositivo', value: device, inline },
				{ name: `🛠️ ▏Cargos **(${roles.size})**`, value: `${roles}` },
			]);
		}

		// if (banner) mainEmbed.setImage(banner);

		interaction.editReply({ embeds: [mainEmbed], files: [{ attachment: await user._rAvatar(), name: `${user.id}-pfp.png` }] });
	},
};

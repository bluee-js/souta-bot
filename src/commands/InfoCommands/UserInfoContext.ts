import { MessageEmbed } from 'discord.js';
import { Command } from '../../interfaces';

export const command: Command = {
	name: 'infos-do-usuário',
	description: 'Obtenha as informações gerais de um usuário ou membro.',
	testOnly: true,
	type: 'USER',

	run: async ({ client, interaction, target: member }) => {
    await interaction.deferReply({ ephemeral: true });
    
		const user = await client.users.fetch(member.id);
		let { joinedText, nickname, status, device, roles } = member.memberInfo();
		let { id, bot, createdText } = user.userInfo();
    let mention = member.toString();
		let inline = true;

		let mainEmbed = new MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user._avatar())
			.setDescription(`**Informações gerais de ${mention}**`)
			.setThumbnail(`attachment://${user.id}-pfp.png`)
			.setColor('BLURPLE')
			.addFields([
				{ name: '🆔 ▏ID do Usuário', value: id, inline },
				{ name: '🤖 ▏Bot', value: bot, inline },
				{ name: '🕞 ▏Conta criada em', value: createdText },
				{ name: '🕑 ▏Entrou no servidor em', value: joinedText },
				{ name: '👥 ▏Apelido', value: nickname, inline },
				{ name: '☑️ ▏Status', value: status, inline },
				{ name: '🖥️ ▏Dispositivo', value: device, inline },
				{ name: `🛠️ ▏Cargos **(${roles.size})**`, value: `${roles}` },
			]);

		interaction.editReply({
			embeds: [mainEmbed],
			files: [
				{ attachment: await user._rAvatar(), name: `${user.id}-pfp.png` },
			],
		});
	},
};

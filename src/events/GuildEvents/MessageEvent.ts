import { clean, ready, field } from '../../utils/Evaluate';
import Discord, { Message } from 'discord.js';
import { RunEvent } from '../../interfaces';
import { Souta } from '../../client/Client';

export const run: RunEvent = async (client: Souta, message: Message) => {
	const {
		MessageSelectMenu,
		MessageActionRow,
		MessageButton,
		MessageEmbed,
		Permissions,
		GuildMember,
		Message,
		User,
	} = Discord;

	const { content, author, mentions } = message;
	const mentioned = mentions.users.first();

	if (
		!mentioned ||
		!mentioned.equals(client.user) ||
		!client.config.botOwner.includes(author.id)
	) {
		return;
	}

	const newContent = content.slice(mentioned.toString().length + 1).trim();
	const evalEmbed = new MessageEmbed()
		.setColor('#2F3136')
		.addField('Entrada', newContent.crase());

	try {
		const evaluated = !newContent.startsWith('await')
			? await eval(newContent)
			: await eval(`(async () => {\n${newContent}\n})()`);

		evalEmbed.addFields(await field(ready(evaluated)));
	} catch (err) {
		evalEmbed.addFields(await field(clean(err)));
	} finally {
		message.reply({ embeds: [evalEmbed] });
	}
};

export const name: string = 'messageCreate';

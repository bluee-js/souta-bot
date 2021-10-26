import { perms, owner, arg } from '../../utils/Commands';
import { RunEvent, Command } from '../../interfaces';
import { GuildMember } from 'discord.js';

export const run: RunEvent = async (client, interaction) => {
	if (!interaction.isCommand() && !interaction.isContextMenu()) return;

	const { commandName, member, guild, channel = null } = interaction;
	const {
		ownerOnly = false,
		cooldown = -1,
		reqPerms = [],
		everyone,
		run,
	}: Command = client.commands.get(commandName);

	let args, target;

	if (interaction.isCommand()) {
		let owner_ = owner(ownerOnly, member as GuildMember);
		let perms_ = perms(reqPerms, interaction);
		args = arg(interaction.options.data);

		if (owner_) {
			interaction.reply(owner_);
			return;
		}

		if (perms_) {
			interaction.reply(perms_);
			return;
		}

		if (!everyone) {
			const ephemeral = !interaction.options.getBoolean('mostrar-para-todos');
			await interaction.deferReply({ ephemeral });
		}
	}

	if (interaction.isContextMenu()) {
		const { targetType, targetId } = interaction;

		if (targetType == 'USER') {
			target = await guild.members.fetch(targetId);
		}

		if (targetType == 'MESSAGE') {
			target = await channel.messages.fetch(targetId);
		}
	}

	try {
		if (interaction.isCommand()) await run({ client, interaction, args });
		else await run({ client, interaction, target });
	} catch (err) {
		interaction.followUp('Ocorreu um erro ao executar este comando.');
		client.logger.error(`Command ${commandName}`, err);
	}
};

export const name: string = 'interactionCreate';

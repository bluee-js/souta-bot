import {
	InteractionReplyOptions,
	GuildMember,
	MessageEmbed,
	CommandInteraction,
	Guild,
} from 'discord.js';

import { getPerm } from './Permissions';
import { client } from '../index';

interface PermsFunction {
	(perms: string[], target: CommandInteraction): {
		embeds: MessageEmbed[];
		ephemeral: boolean;
	} | null;
}

interface OwnerFunction {
	(ownerOnly: boolean, target: GuildMember): InteractionReplyOptions | null;
}

const { embed, config } = client;
const { error } = embed;
const ephemeral = true;

const perms: PermsFunction = (perms, { member, guild }) => {
	member = member as GuildMember;
	guild = guild as Guild;

	let getPerms = (target) =>
		target.permissions?.missing(perms).map((perm) => getPerm(perm));

	let memberPerms = getPerms(member);
	let clientPerms = getPerms(guild.me);

	let permsStr = (perms) => perms.join(', ');
	let s = (perms) => (perms.length > 0 ? 's' : '');
	let a = (perms) => (perms.length > 0 ? 'ões' : 'ão');

	let reply = null;

	if (memberPerms.length) {
		if (!reply?.embeds) (reply = {}), (reply.embeds = []), (reply.ephemeral = true);
		reply.embeds.push(
			error(
				`Você precisa da${s(memberPerms)} permiss${a(memberPerms)} ${permsStr(
					memberPerms
				).crase(true)} para executar este comando.`
			)
		);
	}

	if (clientPerms.length) {
		if (!reply?.embeds) (reply = {}), (reply.embeds = []), (reply.ephemeral = true);
		reply.embeds.push(
			error(
				`Eu preciso da${s(clientPerms)} permiss${a(clientPerms)} ${permsStr(
					clientPerms
				).crase(true)} para executar este comando.`
			)
		);
	}

	return reply;
};

const owner: OwnerFunction = (ownerOnly, target) => {
	if (ownerOnly && !config.botOwner.includes(target.id)) {
		return {
			embeds: [error('Apenas o dono do bot pode utilizar este comando.')],
			ephemeral,
		};
	}
	return null;
};

function arg(data): string[] {
	let args = [];
	for (let option of data) {
		if (option.type === 'SUB_COMMAND') {
			if (option.name) args.push(option.name);
			option.options?.forEach((x) => {
				if (x.value) args.push(x.value);
			});
		} else if (option.value) args.push(option.value);
	}
	return args;
}

export { perms, owner, arg };

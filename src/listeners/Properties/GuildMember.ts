import { GuildMember } from 'discord.js';

interface MemberInfo {
	roles: {
		size: number;
		toString(): string;
	};
	device: string;
	status: string;
	joined: string;
	joinedR: string;
	nickname: string;
}

interface Roles {
	(every: boolean, map: boolean, join: string): {
		size: number;
		toString(): string;
	};
}

declare global {
	interface GuildMember {
		_status(useEmoji: boolean): string;
		_device(useEmoji: boolean): string;
		_joined(style: string): string;
		_nickname(): string;
		_roles: Roles;

		memberInfo(): MemberInfo;
	}
}

Object.defineProperties(GuildMember.prototype, {
	_getroles: {
		value: function (every = false, map = true, join = ', ') {
			let roles = this.roles.cache;

			if (!every) {
				roles = roles.filter((r) => r.id !== r.guild.roles.everyone.id);
			}

			if (roles.size == 0)
				return {
					size: 0,
					toString: () => `Sem cargos...`,
				};

			let rolesMap = roles.map((r) => r.toString());
			if (map) rolesMap = rolesMap.join(join);

			return {
				size: roles.size,
				toString: () => rolesMap,
			};
		},
		writable: true,
	},
	_device: {
		value: function (useEmoji = false) {
			let devices = {
				unknown: 'Desconhecido',
				desktop: 'Computador',
				mobile: 'Celular',
				web: 'Navegador',
			};

			let emojis = {
				unknown: '👥',
				desktop: '💻',
				mobile: '📱',
				web: '🌐'
			}

			let device = Object.keys(this.presence.clientStatus)[0] ?? 'unknown'

			if (useEmoji) return `${emojis[device]} ${devices[device].crase(true)}`
			return devices[device];
		},
	},
	_status: {
		value: function (useEmoji = false) {
			let status = {
				online: 'Disponível',
				dnd: 'Não Perturbe',
				offline: 'Offline',
				idle: 'Ausente',
			};

			let emojis = {
				offline: '<:off:894560884083535923>',
				online: '<:on:894560902072918066>',
				idle: '<:idle:894560901846425601>',
				dnd: '<:dnd:894560902030970900>',
			};

			let presence = this.presence.status ?? 'offline';

			if (useEmoji) return `${emojis[presence]}${status[presence].crase(true)}`;
			return status[presence];
		},
	},
	_joined: {
		value: function (style = 'f') {
			return `<t:${Math.floor(this.joinedTimestamp / 1000)}:${style}>`;
		},
	},
	_nickname: {
		value: function () {
			return this.nickname ?? 'Sem apelido';
		},
	},
});

Object.defineProperty(GuildMember.prototype, 'memberInfo', {
	value: function () {
		let roles = this._getroles();
		if (roles.size > 1000) roles.toString = () => `**${roles.size}** cargos...`;

		return {
			roles,
			device: this._device(true),
			status: this._status(true),
			nickname: this._nickname().crase(true),
			joinedText: `${this._joined()}\n▸ ${this._joined('R')}`,
		};
	},
});

export default () => null;

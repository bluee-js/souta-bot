import { User } from 'discord.js';
import Canvas from 'canvas';

interface UserInfo {
	tag: string;
	bot: string;
	avatar: string;
	banner: string;
	created: string;
	createdR: string;
}

declare global {
	interface User {
		_bot(emojiY: string, emojiN: string): string;
		_created(style: string): string;
		_avatar(size: number): string;
		_rAvatar(): Promise<Buffer>;
		_banner(): string;

		userInfo(): UserInfo;
	}
}

Object.defineProperties(User.prototype, {
	_rAvatar: {
		value: async function () {
			const avatar = this.displayAvatarURL({ format: 'png' });
    	const canvas = Canvas.createCanvas(200, 200);
    	const ctx = canvas.getContext('2d');

    	ctx.beginPath();
	  	ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
	  	ctx.closePath();
    	ctx.clip();
    
    	const canvasAvatar = await Canvas.loadImage(avatar);
			ctx.drawImage(canvasAvatar, 0, 0, 200, 200);
			
			return canvas.toBuffer();
		},
	},
	_banner: {
		value: function () {
			const { banner } = this;
			if (!banner) {
				return null;
			}

			const ext = banner.startsWith('a') ? '.gif' : '.png';
			return `https://cdn.discordapp.com/banners/${this.id}/${banner}${ext}`;
		}
	},
	_created: {
		value: function (style = 'f') {
			return `<t:${Math.floor(this.createdTimestamp / 1000)}:${style}>`;
		},
	},
	_avatar: {
		value: function (size = 4096) {
			return this.displayAvatarURL({ dynamic: true, format: 'png', size });
		},
	},
	_bot: {
		value: function (emojiY = '', emojiN = '') {
			return (this.bot ? `${emojiY} Sim` : `${emojiN} Não`).trim();
		},
	},
});

Object.defineProperty(User.prototype, 'userInfo', {
	value: function () {
		return {
			tag: this.tag,
			banner: this._banner(),
			avatar: this._avatar(2048),
			bot: this._bot().crase(true),
			id: this.id.toString().crase(true),
			createdText: `${this._created()}\n▸ ${this._created('R')}`,
		};
	},
});

export default () => null;

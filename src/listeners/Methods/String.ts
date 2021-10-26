declare global {
	interface String {
		removeUnder: () => string;
		capitalize: () => string;
		tileize: () => string;
		crase: () => string;
		bold: () => string;
		italic: () => string;
	}
}

Object.defineProperties(String.prototype, {
	removeUnder: {
		value: function () {
			return this.replace(/_/g, ' ');
		},
	},
	capitalize: {
		value: function () {
			return this.charAt(0).toUpperCase() + this.slice(1);
		},
	},
	tileize: {
		value: function () {
			return this.toLowerCase().replace(/(\s|^)\w/g, (m) => m.toUpperCase());
		},
	},
	crase: {
		value: function (single = false, md = 'js') {
			if (single) return `\`${this}\``;
			return `\`\`\`${md}\n${this}\n\`\`\``;
		},
	},
	bold: {
		value: function () {
			return `**${this}**`;
		},
	},
	italic: {
		value: function () {
			return `*${this}*`;
		},
	},
});

export default () => null;

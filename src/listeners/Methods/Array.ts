declare global {
	interface Array<T> {
		capitalize(): any[];
		tileize(): any[];
		crase(): any[];
		random: any;
	}
}

function verify(el) {
	return typeof el == 'string';
}

Object.defineProperties(Array.prototype, {
	capitalize: {
		value: function () {
			return this.map((el) => {
				if (verify(el)) return el.charAt(0).toUpperCase() + el.slice(1);
				return el;
			});
		},
	},
	tileize: {
		value: function () {
			return this.map((el) => {
				if (verify(el))
					return el.toLowerCase().replace(/(\s|^)\w/g, (m) => m.toUpperCase());
				return el;
			});
		},
	},
	crase: {
		value: function (single = false, md = 'js') {
			return this.map((el) => {
				if (verify(el)) {
					if (single) return `\`${el}\``;
					return `\`\`\`${md}\n${el}\n\`\`\``;
				}
				return el;
			});
		},
	},
	random: {
		get: function () {
			return this[~~(Math.random() * this.length)];
		},
	},
});

export default () => null;

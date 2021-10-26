import { EmbedFieldData } from "discord.js";

function clean(string): any {
	if (typeof string === 'string') {
		return string
			.replace(/` /g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return string;
	}
}

function ready(evaluated): string {
	if (typeof evaluated !== 'string')
		evaluated = require('util').inspect(evaluated, { depth: 0 });

	return clean(evaluated);
}

async function field(output: string): Promise<EmbedFieldData[]> {
	let name = '**Saída**';
	if (output.length > 1000) {
		let url = await output._post();
    return [{ name, value: `[Link para Sourcebin](${url})` }];
	}
	return [{ name, value: output.toString().crase() }];
}

export { clean, ready, field };
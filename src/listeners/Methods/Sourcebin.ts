import { create } from 'sourcebin';

interface Post {
	(language?: string, name?: string): Promise<string>;
}

declare global {
	interface String {
		_post: Post;
	}
	interface Array<T> {
		_post: Post;
	}
}

let nam = 'Post';
let lang = 'javascript';
let title = 'SoutaBot | Sourcebin';
let description = 'Um código enviado por Souta.';

String.prototype._post = async function (language = lang, name = nam) {
	let source = await create([{ content: this, name, language }], {
		title,
		description,
	});
	return source.url;
};

Array.prototype._post = async function (language = lang, name = nam) {
	let source = await create([{ content: this.toString(), name, language }], {
		title,
		description,
	});
	return source.url;
};

export default () => null;

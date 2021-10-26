import { ClientOptions } from 'discord.js';
import { Config } from './interfaces';
import 'dotenv/config';

export const clientOptions: ClientOptions = {
	intents: 6087,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	allowedMentions: { parse: ['users', 'roles'] },
};

export const config: Config = {
	youtubeKey: process.env['YOUTUBE_API'],
	nasaKey: process.env['NASA_API'],
	token: process.env['TOKEN'],
	botOwner: ['702529018410303640'],
	testServer: ['875406271614943312', '887828456988114985', '696860574490951690'],
};

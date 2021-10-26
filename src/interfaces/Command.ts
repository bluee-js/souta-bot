import { CommandInteraction, ApplicationCommandOptionData } from 'discord.js';
import { Souta } from '../client/Client';

interface RunOptions {
	client: Souta;
	interaction: CommandInteraction;
	args: string[];
}

export interface RunCommand {
	(RunOptions): Promise<any> | any;
}

export interface Command {
	name: string;
	description: string;
	reqPerms?: string[];
	ownerOnly?: boolean;
	testOnly?: boolean;
	everyone?: boolean;
	cooldown?: number;
	options?: ApplicationCommandOptionData[];
	type?: string | string[];
	run: RunCommand;
}

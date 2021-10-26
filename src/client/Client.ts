import { Client, Collection, Guild, MessageEmbed } from 'discord.js';
import { Command, Config, Embeds, Event } from '../interfaces';
import { config, clientOptions } from '../config';
import consola, { Consola } from 'consola';
import { Database } from 'simpl.db';
import { promisify } from 'util';
import glob from 'glob';

const globPromise = promisify(glob);

class Souta extends Client {
	commands: Collection<string, Command>;
	events: Collection<string, Event>;
	defaultHex: string;
	logger: Consola;
	config: Config;
	embed: Embeds;
	db: Database;

	public constructor() {
		super(clientOptions);
		this.commands = new Collection();
		this.events = new Collection();
		this.logger = consola;
		this.config = config;
		this.db = new Database();

		this.defaultHex = '#2F3136';
		this.embed = {
			error: (erro: string) =>
				new MessageEmbed().setDescription(erro).setColor('RED'),
		};
	}

	public async start(): Promise<void> {
		await this.loadListeners();
		await this.loadCommands();
		await this.loadEvents();

		this.login(config.token);
	}

	private async loadCommands(): Promise<void> {
		const commandPath = '/src/commands/**/*{.ts,.js}';
		const commandFiles = await globPromise(process.cwd() + commandPath);
		let global = [];
		let tester = [];

		commandFiles.map(async (value: string) => {
			let { command } = await import(value);

			if (!command.type && !command.everyone) {
				if (!command.options) command.options = [];
				command.options.push({
					name: 'mostrar-para-todos',
					description: 'Se a resposta do comando deve ser mostrada para todos.',
					type: 'BOOLEAN',
				});
			}

			if (command.type) {
				delete command.description;
				delete command.options;
			}

			this.commands.set(command.name, command);

			if (!command.testOnly) global.push(command);
			else tester.push(command);
		});

		this.on('ready', async () => {
			if (global.length) await this.application.commands.set(global);
			if (tester.length) {
				config.testServer.forEach(async (id) => {
					const guild: Guild = await this.guilds.fetch(id);
					await guild.commands.set(tester);
				});
			}
		});
	}

	private async loadEvents(): Promise<void> {
		const eventPath = '/src/events/**/*.ts';
		const eventFiles = await globPromise(process.cwd() + eventPath);

		eventFiles.map(async (value: string) => {
			const event: Event = await import(value);

			this.events.set(event.name, event);
			this.on(event.name, event.run.bind(null, this));
		});
	}

	private async loadListeners(): Promise<void> {
		const listenPath = '/src/listeners/**/*{.ts,.js}';
		const listenFiles = await globPromise(process.cwd() + listenPath);

		listenFiles.map(async (value: string) => {
			const listener = await import(value);
			listener.default(this);
		});
	}
}

export { Souta };

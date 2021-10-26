import { Souta } from '../../client/Client';
import { RunEvent } from '../../interfaces';

export const run: RunEvent = (client: Souta) => {
	client.user.setPresence({
		activities: [{ name: 'umas parada ae', type: 'PLAYING' }],
		status: 'idle',
	});
	client.logger.success('Bot Logado!');
};

export const name: string = 'ready';

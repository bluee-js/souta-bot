import { Souta } from '../client/Client';

export interface RunEvent {
	(client: Souta, ...args: any[]): Promise<any> | any
}

export interface Event {
	name: string;
	run: RunEvent;
}

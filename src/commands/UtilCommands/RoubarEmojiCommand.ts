import { Command } from '../../interfaces';
import { Util } from 'discord.js';

export const command: Command = {
	name: 'roubar-emoji',
  description: 'Adicione um emoji a partir de um emoji de outro servidor.',
  reqPerms: ['MANAGE_EMOJIS_AND_STICKERS'],
	testOnly: true,

	options: [
		{
			name: 'emoji',
			required: true,
			description: 'O emoji que será adicionado.',
			type: 'STRING',
		},
	],

  run: async ({ client, interaction, args }) => {
    
  },
};

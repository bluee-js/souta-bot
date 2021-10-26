import { Command } from '../../interfaces';

export const command: Command = {
	name: 'add-emoji',
  description: 'Adicione um emoji a partir de um link de imagem.',
  reqPerms: ['MANAGE_EMOJIS_AND_STICKERS'],
	testOnly: true,

	options: [
		{
			name: 'url',
			required: true,
			description: 'Link para imagem do emoji.',
			type: 'STRING',
		},
		{
			name: 'nome',
			required: true,
			description: 'Nome do emoji.',
			type: 'STRING',
		},
	],

  run: async ({ client, interaction, args }) => {
    
  },
};

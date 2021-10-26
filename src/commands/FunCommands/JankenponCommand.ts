import { Command } from '../../interfaces';

export const command: Command = {
	name: 'jankenpon',
	description: 'Jogue pedra, papel ou tesoura contra mim! Boa sorte.',
	testOnly: true,

	options: [
		{
			name: 'jogada',
			required: true,
			description: 'O que vai jogar desta vez?',
			type: 'STRING',
			choices: [
				{ name: 'Pedra', value: 'rock' },
				{ name: 'Papel', value: 'paper' },
				{ name: 'Tesoura', value: 'scissors' },
			],
		},
	],

	run: async ({ client, interaction, args }) => {
		let plays = {
			rock: 'Pedra',
			paper: 'Papel',
			scissors: 'Tesoura',
		};

		let random = ['rock', 'paper', 'scissors'].random;
		let choice = args[0];
		let content = `Você jogou \`${plays[choice]}\` e eu joguei \`${plays[random]}\`.`;

		if (random == choice) content += ' Empatamos!';

		if (
			(random == 'rock' && choice == 'paper') ||
			(random == 'paper' && choice == 'scissors') ||
			(random == 'scissors' && choice == 'rock')
		)
			content += ' Você ganhou. Parabéns!';

		if (
			(choice == 'rock' && random == 'paper') ||
			(choice == 'paper' && random == 'scissors') ||
			(choice == 'scissors' && random == 'rock')
		)
			content += ' Eu ganhei! Boa sorte na próxima.';

		interaction.editReply({ content });
	},
};

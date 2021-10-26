import { Command } from '../../interfaces';
import { Calculator } from 'weky-slash';

export const command: Command = {
	name: 'calculadora',
	description: 'Crie e use uma calculadora funcional.',
	testOnly: true,
	everyone: true,

	run: async ({ interaction }) => {
		await interaction.deferReply();

		await Calculator({
			message: interaction,
			slash: true,
			embed: {
				title: 'Calculadora',
				color: '#f64747',
				footer: 'Ao usar os botões pode haver um delay padrão do Discord.',
				timestamp: false,
			},
			disabledQuery: 'Você desativou a calculadora.',
			invalidQuery: 'A equação inserida é inválida!',
			othersMessage: 'Os botões apenas podem ser usados por <@{{author}}>.',
		});
	},
};

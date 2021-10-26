import { ApplicationCommandOptionChoice } from 'discord.js';

const activities =  {
  youtube: { name: 'Youtube', value: '880218394199220334' },
  poker: { name: 'Poker', value: '755827207812677713' },
  chess: { name: 'Xadrez', value: '832012774040141894' },
  fishing: { name: 'Pescaria', value: '814288819477020702' },
  betrayal: { name: 'Betrayal', value: '773336526917861400' },
  wordsnack: { name: 'Word Snack', value: '879863976006127627' },
  lettertile: { name: 'Letter Tile', value: '879863686565621790' },
  doodlecrew: { name: 'Doodle Crew', value: '878067389634314250' },
};

let choices: ApplicationCommandOptionChoice[] = [];

for (let act of Object.keys(activities)) {
	choices.push(activities[act]);
}

export { choices };

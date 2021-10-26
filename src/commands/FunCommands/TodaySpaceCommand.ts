import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: 'universo-hoje',
  description: 'Veja uma imagem do universo hoje. (NASA)',
  testOnly: true,
  everyone: true,

  run: async ({ client, interaction }) => {
    await interaction.deferReply()

    const nasaLogo = 'https://logodownload.org/wp-content/uploads/2019/03/nasa-logo-7.png';
    const siteURL = 'https://apod.nasa.gov/apod/';
    const apiURL = 'https://api.nasa.gov/planetary/apod?api_key=' + client.config.nasaKey;

    const { data }: any = await axios.get(apiURL);
    let { copyright, title, date, url } = data;

    const universeEmbed = new MessageEmbed()
      .setAuthor(`${title} | ${date}`, nasaLogo, siteURL)
      .setColor(client.defaultHex)
      .setImage(url)
      .setFooter(`©️ ${copyright}`);
    
    interaction.editReply({ embeds: [universeEmbed] });
  }
}
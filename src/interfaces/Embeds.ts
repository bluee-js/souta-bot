import { MessageEmbed } from "discord.js";

export interface Embeds {
  error: (erro: string) => MessageEmbed;
}
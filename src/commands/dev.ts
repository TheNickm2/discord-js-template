import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export function createCommandDev() {
  return new SlashCommandBuilder()
    .setName('dev')
    .setDescription('Information for developers');
}

export async function executeCommandDev(interaction: CommandInteraction) {
  await interaction.reply({
    content: 'This command is not yet implemented.',
    ephemeral: true,
  });
}

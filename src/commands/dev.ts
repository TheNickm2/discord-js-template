import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const devCommand = {
  createCommand: () => {
    return new SlashCommandBuilder()
      .setName('dev')
      .setDescription('Information for developers');
  },
  executeCommand: async (interaction: CommandInteraction) => {
    await interaction.reply({
      content: 'This command is not yet implemented.',
      ephemeral: true,
    });
  },
};

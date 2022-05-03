import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { EventEmitter } from 'events';

const DEV_BUTTON_ID = 'devButton';

export const devCommand = {
  createCommand: () => {
    return new SlashCommandBuilder()
      .setName('dev')
      .setDescription('Information for developers');
  },
  registerEvents: (emitter: EventEmitter) => {
    emitter.on(DEV_BUTTON_ID, async (interaction: ButtonInteraction) => {
      await interaction.reply({
        content: 'You clicked my button :o',
        ephemeral: true,
      });
    });
  },
  executeCommand: async (interaction: CommandInteraction) => {
    await interaction.reply({
      content: 'This command is not yet implemented.',
      ephemeral: true,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(DEV_BUTTON_ID)
            .setEmoji('⌨️')
            .setLabel('Dev Button')
            .setStyle('PRIMARY'),
        ),
      ],
    });
  },
};

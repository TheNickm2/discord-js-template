import { devCommand } from '@/commands/dev';
import type { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';

export default [devCommand] as Command[];

export interface Command {
  createCommand: () => SlashCommandBuilder;
  executeCommand: (interaction: CommandInteraction) => Promise<void>;
}

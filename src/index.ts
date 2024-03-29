import { Commands } from './commands';
import { CacheType, Client, Intents, Interaction } from 'discord.js';
import { EventEmitter } from 'events';
import * as Dotenv from 'dotenv';
import { Logger } from '@/utils';

Dotenv.config();

const Emitter = new EventEmitter();

function Main() {
  try {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      Logger.error('BOT_TOKEN environment variable is required.');
      return;
    }

    const botClient = new Client({
      intents: [
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      ],
      ws: {
        properties: {
          $browser: 'Discord iOS',
        },
      },
    });

    botClient.on('ready', () => {
      Logger.info(`Logged in as ${botClient.user?.username}`);
    });

    botClient.on('interactionCreate', InteractionHandler);

    Commands.forEach((command) => {
      command.registerEvents(Emitter);
    });

    botClient.login(botToken);
  } catch (err) {
    if (err) {
      Logger.error(
        `An error occurred while creating the bot client. See error below.\n${err}`,
      );
    } else {
      Logger.error(
        `An error occurred while creating the bot client. No error message has been provided.`,
      );
    }
  }
}

async function InteractionHandler(interaction: Interaction<CacheType>) {
  try {
    if (interaction.isCommand()) {
      const command = Commands.find(
        (cmd) => cmd.createCommand().name === interaction.commandName,
      );
      if (!command) return;
      await command.executeCommand(interaction);
    } else if (interaction.isButton()) {
      Emitter.emit(interaction.customId, interaction);
    }
  } catch (err) {
    if (err) {
      Logger.error(
        `An error occurred while handling an interaction. See error below.\n${err}\n\n${
          (err as Error).stack
        }`,
      );
    } else {
      Logger.error(
        `An error occurred while handling an interaction. No error message has been provided.`,
      );
    }
  }
}

Main();

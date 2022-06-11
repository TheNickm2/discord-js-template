import { MessageEmbed } from 'discord.js';

export interface embedDevInfoParams {
  nodeVersion: string;
  tsVersion: string;
  djsVersion: string;
  heapSize: string;
  heapUsed: string;
  hostname: string;
  serverId: string;
  userId: string;
  developer: string;
}

export function embedDevInfo(params: embedDevInfoParams) {
  return new MessageEmbed().setTitle(`Developer Info`).addFields([
    {
      name: 'Versions',
      value: `Node.js: ${params.nodeVersion}\nTypeScript: v${params.tsVersion}\ndiscord.js: v${params.djsVersion}`,
    },
    {
      name: 'Memory',
      value: `Heap: ${params.heapSize}\nUsed: ${params.heapUsed}`,
    },
    {
      name: 'IDs',
      value: `Server: ${params.serverId}\nUser: ${params.userId}\nDeveloper: ${params.developer}`,
    },
  ]);
}

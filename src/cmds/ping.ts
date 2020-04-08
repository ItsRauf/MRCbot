import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

export const cmd = new Command(
  'ping',
  (MRC, msg) => {
    const embed = new MessageEmbed();
    embed
      .setTitle(':ping_pong: Pong!')
      .addField('Socket Latency', `${MRC.ws.ping}ms`);
    msg.channel.send(embed);
  },
  {
    description: 'See if the bot is alive',
    usage: ['ping'],
  }
);

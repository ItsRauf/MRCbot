import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

function validateHexColor(color: string): boolean {
  const regex = /[0-9A-Fa-f]{6}/gm;
  return regex.test(color);
}

export const cmd = new Command(
  'setcolor',
  async (MRC, msg, [hexColor]) => {
    if (!hexColor) {
      msg.channel.send('Missing parameter: `color`');
    } else if (!validateHexColor(hexColor)) {
      msg.channel.send('Invalid parameter: `color`');
    } else {
      const embed = new MessageEmbed();
      embed
        .setTitle(hexColor)
        .setColor(hexColor)
        .setImage(`http://placehold.it/150/${hexColor}/${hexColor}`);
      msg.channel.send(embed);
    }
  },
  {
    description: 'See if the bot is alive',
    usage: ['ping'],
    aliases: ['c', 'col'],
  }
);

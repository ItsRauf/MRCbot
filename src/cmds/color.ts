import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

function validateHexColor(color: string): boolean {
  const regex = /[0-9A-Fa-f]{6}/gm;
  return regex.test(color);
}

export const cmd = new Command(
  'color',
  async (MRC, msg, [hexColor]) => {
    if (!hexColor) {
      msg.channel.send('Missing parameter: `hex code`');
    } else if (!validateHexColor(hexColor)) {
      msg.channel.send('Invalid parameter: `hex code`');
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
    description: 'Preview a color via hex code',
    usage: ['color {hex code}'],
    aliases: ['c', 'col'],
  }
);

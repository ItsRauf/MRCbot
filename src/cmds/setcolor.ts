import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

function validateHexColor(color: string): boolean {
  const regex = /[0-9A-Fa-f]{6}/gm;
  return regex.test(color);
}

export const cmd = new Command(
  'setcolor',
  async (MRC, msg, [rID, hexColor, ...reason]) => {
    if (!rID) {
      msg.channel.send('Missing parameter: `role id`');
    } else if (!hexColor) {
      msg.channel.send('Missing parameter: `color`');
    } else if (!validateHexColor(hexColor)) {
      msg.channel.send('Invalid parameter: `color`');
    } else {
      const role = await msg.guild?.roles.fetch(rID);
      if (role) {
        role.setColor(hexColor, reason.join(' '));
        msg.channel.send(
          `Role \`${role.name} (${role.id})\` is now set to color \`${hexColor}\``
        );
      } else {
        const embed = new MessageEmbed();
        embed
          .setTitle('Error')
          .setDescription('Role not found!')
          .setColor('RED');
        msg.channel.send(embed);
      }
    }
  },
  {
    description: 'See if the bot is alive',
    usage: ['ping'],
    aliases: ['sc', 'setcol'],
  }
);

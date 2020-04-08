import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

function validateHexColor(color: string): boolean {
  const regex = /[0-9A-Fa-f]{6}/gm;
  return regex.test(color);
}

export const cmd = new Command(
  'setcolor',
  async (MRC, msg, [rID, hexColor, ...reason]) => {
    if (!msg.member?.permissions.has('MANAGE_ROLES')) {
      // Do Nothing
    } else if (!rID) {
      msg.channel.send('Missing parameter: `role id`');
    } else if (!hexColor) {
      msg.channel.send('Missing parameter: `hex code`');
    } else if (!validateHexColor(hexColor)) {
      msg.channel.send('Invalid parameter: `hex code`');
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
    description: "Change a role's color to a specified hex code",
    usage: ['setcolor {rold id} {hex code} [reason]'],
    aliases: ['sc', 'setcol'],
  }
);

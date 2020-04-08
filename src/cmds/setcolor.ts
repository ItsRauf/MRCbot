import { Command } from './Command';
import { MessageEmbed, Message, Role } from 'discord.js';
import { findBestMatch } from 'string-similarity';

function validateHexColor(color: string): boolean {
  const regex = /[0-9A-Fa-f]{6}/gm;
  return regex.test(color);
}

async function findRole(msg: Message, role: string) {
  const guildRole =
    msg.guild?.roles.cache.get(role) ||
    msg.guild?.roles.cache.find(
      r => r.name.toLowerCase() === role.toLowerCase()
    );
  if (guildRole) return guildRole;
  // Match the nearest role name
  const guildRoles: Role[] | undefined = msg.guild?.roles.cache.array();
  if (!guildRoles) return null;
  const roleArray: string[] = guildRoles.map(r => r.name.toLowerCase());
  const {
    bestMatchIndex,
    bestMatch: { rating },
  } = findBestMatch(role.toLowerCase(), roleArray);
  if (rating < 0.3) return null;
  return guildRoles[bestMatchIndex];
}

export const cmd = new Command(
  'setcolor',
  async (MRC, msg, [hexColor, ...rID]) => {
    if (!msg.member?.permissions.has('MANAGE_ROLES')) {
      // Do Nothing
    } else if (!rID) {
      msg.channel.send('Missing parameter: `role id`');
    } else if (!hexColor) {
      msg.channel.send('Missing parameter: `hex code`');
    } else if (!validateHexColor(hexColor)) {
      msg.channel.send('Invalid parameter: `hex code`');
    } else {
      const role = await findRole(msg, rID.join(' '));
      if (role) {
        role.setColor(
          hexColor,
          `Role color changed on behalf of ${msg.author.tag} at ${new Date()}`
        );
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
    usage: ['setcolor {hex code} {role name | id | mention}'],
    aliases: ['sc', 'setcol'],
  }
);

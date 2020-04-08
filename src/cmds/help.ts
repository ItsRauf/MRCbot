import { Command } from './Command';
import { MessageEmbed } from 'discord.js';

export const cmd = new Command(
  'help',
  async (MRC, msg, [cmdName]) => {
    const embed = new MessageEmbed();
    if (cmdName) {
      const helpCMD = MRC.commands.get(cmdName);
      if (!helpCMD) {
        embed
          .setTitle('Unknown Command')
          .setDescription('The command you are looking for was not found!');
        msg.channel.send(embed);
      } else if (helpCMD.opts.hidden) {
        // Do Nothing
      } else {
        embed
          .setTitle(`Help for ${helpCMD.name}`)
          .setDescription(helpCMD.opts.description)
          .addField('Usage', helpCMD.opts.usage.join('\n'));
        if (helpCMD.opts.aliases) {
          embed.addField('Aliases', helpCMD.opts.aliases.join('\n'));
        }
        msg.channel.send(embed);
      }
    } else {
      const cmds = MRC.commands.array();
      embed.setDescription(
        [...new Set(cmds.map(cmd => cmd.name))].sort().join('\n')
      );
      msg.channel.send(embed);
    }
  },
  {
    description: 'See if the bot is alive',
    usage: ['help [cmd]'],
    aliases: ['h'],
  }
);

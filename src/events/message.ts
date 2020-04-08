import { Event } from './Event';
import { prefix } from '../priv/config';
import { MessageEmbed } from 'discord.js';

function parseCommand(content: string) {
  const split = content.split(' ');
  const cmdName = split[0].slice(prefix.length);
  split.shift();
  return [cmdName, ...split];
}

export const event = new Event('message', (MRC, msg) => {
  /* Ignore Bots */
  if (msg.author.bot) {
    return;
  }
  /* Check if message starts with prefix */
  if (msg.content.startsWith(prefix)) {
    const [cmdName, ...args] = parseCommand(msg.content);
    if (MRC.commands.has(cmdName)) {
      const cmd = MRC.commands.get(cmdName);
      cmd?.func(MRC, msg, args);
    } else {
      const embed = new MessageEmbed();
      embed
        .setTitle('Unknown Command')
        .setDescription('The command you are trying to use was not found!');
      msg.channel.send(embed);
    }
  }
});

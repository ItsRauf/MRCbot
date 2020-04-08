import { readdir } from 'fs';
import { promisify } from 'util';
import { MRCClient } from './MRCClient';
import { Command } from '../cmds/Command';

const readDir = promisify(readdir);

export async function CommandLoader(MRC: MRCClient): Promise<void> {
  const cmdFiles = await readDir('./build/cmds');
  for await (const file of cmdFiles) {
    if (file.endsWith('js') && file !== 'Command.js') {
      const { cmd } = await import(`../cmds/${file}`);
      if (cmd instanceof Command) {
        MRC.logger.info(`Registered Command: ${cmd.name}`);
        MRC.commands.set(cmd.name, cmd);
        if (cmd.opts.aliases) {
          cmd.opts.aliases.forEach(alias => {
            MRC.commands.set(alias, cmd);
            MRC.logger.info(
              `Registered Command Alias: ${alias} => ${cmd.name}`
            );
          });
        }
      }
    }
  }
}

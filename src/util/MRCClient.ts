import { Client, ClientOptions, Collection } from 'discord.js';
import { Logger } from './Logger';
import { Command } from '../cmds/Command';

export class MRCClient extends Client {
  public logger: Logger;
  public commands: Collection<string, Command>;
  constructor(opts?: ClientOptions) {
    super(opts);
    this.logger = new Logger();
    this.commands = new Collection();
  }
}

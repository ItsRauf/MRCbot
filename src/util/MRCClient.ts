import { Client, ClientOptions } from 'discord.js';
import { Logger } from './Logger';

export class MRCClient extends Client {
  public logger: Logger;
  constructor(opts?: ClientOptions) {
    super(opts);
    this.logger = new Logger();
  }
}

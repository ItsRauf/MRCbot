import { MRCClient } from '../util/MRCClient';
import { Message } from 'discord.js';

type CommandFunc = (MRC: MRCClient, msg: Message, args: string[]) => void;

interface CommandOpts {
  hidden?: boolean;
  aliases?: string[];
  usage: string[];
  description: string;
}

export class Command {
  constructor(
    public name: string,
    public func: CommandFunc,
    public opts: CommandOpts
  ) {
    this.opts.hidden = this.opts.hidden ?? false;
  }
}

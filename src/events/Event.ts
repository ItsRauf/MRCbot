import { ClientEvents } from 'discord.js';
import { MRCClient } from '../util/MRCClient';

type EventFunc<K extends keyof ClientEvents> = (
  MRC: MRCClient,
  ...args: ClientEvents[K]
) => void;

export class Event<K extends keyof ClientEvents> {
  constructor(public name: K, public func: EventFunc<K>) {}
}

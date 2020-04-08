import { readdir } from 'fs';
import { promisify } from 'util';
import { MRCClient } from './MRCClient';
import { Event } from '../events/Event';

const readDir = promisify(readdir);

export async function EventLoader(MRC: MRCClient): Promise<void> {
  const eventFiles = await readDir('./build/events');
  for await (const file of eventFiles) {
    if (file.endsWith('js') && file !== 'Event.js') {
      const { event } = await import(`../events/${file}`);
      if (event instanceof Event) {
        MRC.logger.info(`Registered Event: ${event.name}`);
        MRC.on(event.name, (...args: []) => {
          event.func(MRC, ...args);
        });
      }
    }
  }
}

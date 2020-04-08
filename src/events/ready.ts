import { Event } from './Event';

export const event = new Event('ready', MRC => {
  MRC.logger.info('Ready to provide custom role colors for mobile!');
});

import { token } from './priv/config';
import { MRCClient } from './util/MRCClient';
import { EventLoader } from './util/EventLoader';

const MRC = new MRCClient();

EventLoader(MRC);

MRC.on('ready', () => {
  MRC.logger.info('Ready to provide custom role colors for mobile!');
});

MRC.login(token);

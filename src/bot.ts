import { token } from './priv/config';
import { MRCClient } from './util/MRCClient';

const MRC = new MRCClient();

MRC.on('ready', () => {
  console.log('Ready to provide custom role colors for mobile!');
});

MRC.login(token);

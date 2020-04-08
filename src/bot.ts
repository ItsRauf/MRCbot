import { token } from './priv/config';
import { MRCClient } from './util/MRCClient';
import { EventLoader } from './util/EventLoader';

const MRC = new MRCClient();

EventLoader(MRC);

MRC.login(token);

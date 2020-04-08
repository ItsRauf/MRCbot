import { token } from './priv/config';
import { MRCClient } from './util/MRCClient';
import { EventLoader } from './util/EventLoader';
import { CommandLoader } from './util/CommandLoader';

const MRC = new MRCClient();

EventLoader(MRC);
CommandLoader(MRC);

MRC.login(token);

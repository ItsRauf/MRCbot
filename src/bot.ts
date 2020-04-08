import { Client } from 'discord.js';
import { token } from './priv/config';

const MRC = new Client();

MRC.on('ready', () => {
  console.log('Ready to provide custom role colors for mobile!');
});

MRC.login(token);

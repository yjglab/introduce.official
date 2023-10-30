//eslint-disable-next-line
require('dotenv').config();
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const hash = async (text: string): Promise<string> => {
  return await bcrypt.hash(text, 11);
};

const hashVerify = async (
  text: string,
  hashedText: string,
): Promise<boolean> => {
  return await bcrypt.compare(text, hashedText);
};

export const AuthHelpers = {
  encrypt,
  decrypt,
  hash,
  hashVerify,
};

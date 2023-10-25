//eslint-disable-next-line
require('dotenv').config();
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const hash = async (text: string): Promise<string> => {
  return await bcrypt.hash(text, 11);
};

const hashVerify = async (text, hashedText): Promise<boolean> => {
  return await bcrypt.compare(text, hashedText);
};

export const AuthHelpers = {
  encrypt,
  decrypt,
  hash,
  hashVerify,
};

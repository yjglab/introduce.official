//eslint-disable-next-line
require('dotenv').config();
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const AES_ALGORITHM = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.AES_KEY, process.env.AES_SALT, 32);
const iv = crypto.randomBytes(16);

const encrypt = (rawText: string) => {
  const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv); // key: 32bytes, iv: 16bytes
  let result = cipher.update(rawText, 'utf8', 'base64');
  result += cipher.final('base64');
  return result;
};
const decrypt = (encryptedText: string) => {
  const deciper = crypto.createDecipheriv(AES_ALGORITHM, key, iv);
  let result = deciper.update(encryptedText, 'base64', 'utf8');
  result += deciper.final('utf8');
  return result;
};

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

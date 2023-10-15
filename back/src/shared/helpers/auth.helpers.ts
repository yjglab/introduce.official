//eslint-disable-next-line
require('dotenv').config();
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

const encrypt = (text: string) => {
  if (!text) return;
  return CryptoJS.AES.encrypt(text, process.env.AES_SALT).toString();
};

const decrypt = (text: string) => {
  if (!text) return '';

  try {
    const bytes = CryptoJS.AES.decrypt(text, process.env.AES_SALT);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

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

//eslint-disable-next-line
require('dotenv').config();
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const privateKey = process.env.AES_PRIVATE_KEY;
const aes256Ctr = 'aes-256-ctr';
const aes256Cbc = 'aes-256-cbc';

const encryptCtr = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    aes256Ctr,
    Buffer.from(privateKey, 'hex'),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decryptCtr = (text: string) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');

  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    aes256Ctr,
    Buffer.from(privateKey, 'hex'),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const encryptCbc = (text: string) => {
  const cipher = crypto.createCipher(aes256Cbc, privateKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptCbc = (text: string) => {
  const decipher = crypto.createDecipher(aes256Cbc, privateKey);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const hash = async (text: string) => {
  return await bcrypt.hash(text, 11);
};

const hashVerify = async (text: string, hashedText: string) => {
  return bcrypt.compare(text, hashedText);
};

export const AuthHelpers = {
  encryptCtr,
  decryptCtr,
  encryptCbc,
  decryptCbc,
  hash,
  hashVerify,
};

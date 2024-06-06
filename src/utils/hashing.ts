import pbkdf from 'js-crypto-pbkdf';
import { Buffer } from 'buffer';

export async function hashPassword(password: string): Promise<string> {
  const salt = '7YHsyhz!jhU#IHijOI-_8976TGTtgHJ4';
  return await pbkdf
    .pbkdf2(Buffer.from(password), Buffer.from(salt), 1000, 64, 'SHA-512')
    .then((key) => {
      let tempHash = '';
      for (let i = 0; i < key.length; i++) {
        tempHash += String.fromCharCode(key[i]);
      }
      tempHash = btoa(tempHash);
      return tempHash;
    });
}

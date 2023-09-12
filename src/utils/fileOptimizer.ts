import { Image } from 'image-js';

export const optimizer = async (image: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve('');
    } catch (err) {
      reject(err);
    }
  });
};

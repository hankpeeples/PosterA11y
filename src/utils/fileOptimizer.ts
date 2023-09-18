// import { Image } from 'image-js';

export const optimizer = async (image: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch('http://localhost:3001/api/v1/processPoster');
      console.log(res);
      resolve(image);
    } catch (err) {
      reject(err);
    }
  });
};

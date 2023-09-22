// import { Image } from 'image-js';

export const optimizer = async (image: string, fileName: string | null): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch('http://localhost:3001/api/v1/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ image, fileName }),
      });
      const ret = await res.json();
      resolve(ret.newImage);
    } catch (err) {
      reject(err);
    }
  });
};

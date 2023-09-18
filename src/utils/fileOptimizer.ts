// import { Image } from 'image-js';

export const optimizer = async (image: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch('http://localhost:3001/api/v1/processPoster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      const newImage = await res.json();
      resolve(newImage);
    } catch (err) {
      reject(err);
    }
  });
};

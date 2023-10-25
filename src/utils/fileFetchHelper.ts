import type { ImgData } from './types';

export const fetchImageAnalysis = async (
  image: string,
  fileName: string | null
): Promise<ImgData> => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch('http://localhost:3001/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ image, fileName }),
      });
      const ret: ImgData = await res.json();
      resolve(ret);
    } catch (err) {
      reject(err);
    }
  });
};

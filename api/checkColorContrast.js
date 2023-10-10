import { extractColors } from 'extract-colors';
import getPixels from 'get-pixels';

const checkContrast = async (path) => {
  try {
    let colors = [];
    getPixels(path, async (err, pixels) => {
      if (!err) {
        const data = [...pixels.data];
        const width = Math.round(Math.sqrt(data.length / 4));
        const height = width;

        const cExt = await extractColors({ data, width, height });
        cExt.forEach((c) => {
          colors.push(c.hex);
        });
      }
    });
    console.log(colors);
  } catch (err) {
    console.log('color contrast err:', err);
  }
};

export default checkContrast;

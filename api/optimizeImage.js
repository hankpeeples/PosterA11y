// import Jimp from 'jimp';
import util from 'node:util';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';

/*
 * OptimizeImage will adjust the following image properties:
 *    - Image DPI
 *    - Image size/resolution
 *    - Add image borders
 *    - Image blur (noise), threshold, contrast
 *    - Remove transparency (image alpha)
 */
const execProm = util.promisify(exec);

const optimizeImage = async (path) => {
  try {
    // add 10px white border
    await execProm(`convert ${path} -bordercolor White -border 10x10 ${path}`);
    // set dpi to 600
    await execProm(`convert ${path} -units PixelsPerInch -density 600 ${path}`);
    // remove image alpha
    await execProm(`convert ${path} -alpha off ${path}`);
    // convert to greyscale and sharpen
    await execProm(
      `convert ${path} -set colorspace Gray -separate -average -sharpen 0x3.0 ${path}`
    );
    // remove noise
    await execProm(`./denoise -m mean ${path} ${path}`);

    const { stdout } = await execProm(`identify -verbose ${path}`);

    console.log(stdout);

    // const jimpImg = await Jimp.read(path);
    const newImg = await fs.readFile(path, 'base64');
    const ext = path.slice(path.lastIndexOf('.'));

    // image has been read from file system, can delete it now
    await fs.unlink(path);
    console.log(`Removed ${path}`);

    return `data:image/${ext};base64,${newImg}`;
  } catch (err) {
    console.error('optimizeIncomingImage():', err.message);
    return { error: 'optimizeIncomingImage(): ' + err.message };
  }
};

export default optimizeImage;

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import getText from './getText.js';
import checkContrast from './checkColorContrast.js';

const startProcessing = async (path) => {
  const ret = {};
  try {
    // run color contrast checker
    ret.contrast = await checkContrast(path);

    // optimize initial image
    await optimizeImage(path);

    const optImage = await readFile(path);
    // doing getText here so I can draw on it after
    const { text, Bbox, Gbox } = await getText(optImage);
    ret.text = text;

    // draw result boxes
    for (let box of Bbox) {
      execSync(
        `convert ${path} -fill none -stroke red -strokewidth 2 -draw "rectangle ${box.x0},${box.y0} ${box.x1},${box.y1}" ${path}`
      );
    }
    for (let box of Gbox) {
      execSync(
        `convert ${path} -fill none -stroke green -strokewidth 2 -draw "rectangle ${box.x0},${box.y0} ${box.x1},${box.y1}" ${path}`
      );
    }

    ret.newImage = await readFile(path);
    ret.palette = await readFile('palette.jpg');

    // image has been read from file system, can delete it now
    await fs.unlink(path);
    await fs.unlink('colored-' + path);

    return ret;
  } catch (err) {
    console.log('startProcessing():', err);
    return { err };
  }
};

/*
 * OptimizeImage will adjust the following image properties:
 *    - Image DPI
 *    - Add image border
 *    - Image blur (noise), threshold, contrast
 *    - Remove transparency (image alpha), grayscale
 *
 *    'convert' is using the ImageMagic command line tool
 */

const optimizeImage = async (path) => {
  try {
    // set dpi to 600
    execSync(`convert ${path} -units PixelsPerInch -density 600 ${path}`);
    // convert to grayscale and sharpen
    execSync(
      `convert ${path} -alpha off -colorspace gray -type grayscale -contrast-stretch 0 -negate \
          -contrast-stretch 1 -compose copy_opacity -opaque none -sharpen 0x1 ${path}`
    );
    // remove noise
    execSync(
      `convert ${path} -fuzz 10% -fill Black -define quantum:format=floating-point -depth 32 \
        -enhance -enhance ${path}`
    );
    // add 10px white border
    execSync(`convert ${path} -bordercolor White -border 10x10 ${path}`);
  } catch (err) {
    console.error('optimizeImage():', err.message);
  }
};

const readFile = async (path) => {
  const newImg = await fs.readFile(path, 'base64');
  const ext = path.slice(path.lastIndexOf('.') + 1);
  return `data:image/${ext};base64,${newImg}`;
};

export default startProcessing;

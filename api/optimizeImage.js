import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import getText from './getText.js';

/*
 * OptimizeImage will adjust the following image properties:
 *    - Image DPI
 *    - Image size/resolution
 *    - Add image borders
 *    - Image blur (noise), threshold, contrast
 *    - Remove transparency (image alpha)
 *
 *    'convert' is using the ImageMagic command line tool
 */

const boxColors = ['red', 'blue', 'green', 'orange', 'yellow', 'purple'];

const optimizeImage = async (path) => {
  try {
    // set dpi to 600
    execSync(`convert ${path} -units PixelsPerInch -density 600 ${path}`);
    // convert to greyscale and sharpen
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

    const optImage = await readFile(path);
    // doing getText here so I can draw on it after
    const { text, bbox } = await getText(optImage);

    const clen = boxColors.length - 1;
    let i = 0;

    for (let box of bbox) {
      execSync(
        `convert ${path} -fill none -stroke ${boxColors[i]} -strokewidth 2 -draw "rectangle ${box.x0},${box.y0} ${box.x1},${box.y1}" ${path}`
      );
      i++;
      if (i > clen) i = 0;
    }

    const newImage = await readFile(path);

    // image has been read from file system, can delete it now
    await fs.unlink(path);
    console.log(`Removed ${path}`);

    return newImage;
  } catch (err) {
    console.error('optimizeIncomingImage():', err.message);
    return { error: 'optimizeIncomingImage(): ' + err.message };
  }
};

const readFile = async (path) => {
  const newImg = await fs.readFile(path, 'base64');
  const ext = path.slice(path.lastIndexOf('.') + 1);
  return `data:image/${ext};base64,${newImg}`;
};

export default optimizeImage;

import Jimp from 'jimp';

/*
 * OptimizeImage will adjust the following image properties:
 *    - Image DPI
 *    - Image size/resolution
 *    - Image blur (noise), threshold, contrast
 */

const optimizeImage = async (path) => {
  try {
    const jimpImg = await Jimp.read(path);
    // image has been read from file system, can delete it now
    await fs.unlink(path);
    console.log(`Removed ${path}`);
    jimpImg.invert();
    return await jimpImg.getBase64Async(Jimp.AUTO);
  } catch (err) {
    console.log('optimizeIncomingImage():', err.message);
    return { error: 'optimizeIncomingImage(): ' + err.message };
  }
};

export default optimizeImage;

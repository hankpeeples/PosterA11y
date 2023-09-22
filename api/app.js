import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Jimp from 'jimp';
import fs from 'node:fs/promises';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.post('/api/v1/optimize', async (req, res) => {
  const regex = new RegExp(`^data:.*?;base64,`, 'gi');
  // make new buffer from file url string
  const imgBuffer = new Buffer.from(req.body.image.replace(regex, ''), 'base64url');
  const filePath = './' + req.body.fileName;
  // save buffer/file to fs
  await fs.writeFile(filePath, imgBuffer);
  console.log(`Saved ${filePath}`);
  // run optimizations
  const newImage = await optimizeIncomingImage(filePath);
  if (newImage.error) {
    res.json({ error: newImage.error });
  } else {
    res.json({
      newImage,
    });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running on :${port}`));

const optimizeIncomingImage = async (path) => {
  try {
    const jimpImg = await Jimp.read(path);
    // image has been read from file system, can delete it now
    await fs.unlink(path);
    console.log(`Removed ${path}`);
    console.log('Image height:', jimpImg.getHeight());
    return await jimpImg.getBase64Async(Jimp.AUTO);
  } catch (err) {
    console.log('optimizeIncomingImage():', err.message);
    return { error: 'optimizeIncomingImage(): ' + err.message };
  }
};

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Jimp from 'jimp';
import fs from 'node:fs';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.post('/api/v1/optimize', async (req, res) => {
  const imgBuffer = new Uint8Array(Buffer.from(req.body.image));
  const filePath = './' + req.body.fileName;
  fs.writeFile(filePath, imgBuffer, (err) => {
    if (err) res.json({ error: err });
    console.log('The file has been saved!');
  });
  // const newImage = await optimizeIncomingImage(filePath);
  // if (newImage.error) {
  //   res.json({ error: newImage.error });
  // } else {
  //   res.json({
  //     newImage,
  //   });
  // }
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running on :${port}`));

const optimizeIncomingImage = async (path) => {
  try {
    const jimpImg = await Jimp.read(path);
    console.log(jimpImg.getHeight());
    return await jimpImg.getBase64Async(Jimp.AUTO);
  } catch (err) {
    console.log('optimizeIncomingImage():', err.message);
    return { error: 'optimizeIncomingImage(): ' + err.message };
  }
};

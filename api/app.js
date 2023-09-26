import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import optimizeImage from './optimizeImage.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: 'localhost:3000' }));

app.post('/api/v1/analyze', async (req, res) => {
  const regex = new RegExp(`^data:.*?;base64,`, 'gi');
  // make new buffer from file url string
  const imgBuffer = new Buffer.from(req.body.image.replace(regex, ''), 'base64url');
  const filePath = './' + req.body.fileName;
  // save buffer/file to fs
  await fs.writeFile(filePath, imgBuffer);
  console.log(`Saved ${filePath}`);
  // run optimizations
  const newImage = await optimizeImage(filePath);

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

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import startProcessing from './imageProcessing.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app.post('/api/v1/analyze', async (req, res) => {
  const regex = new RegExp(`^data:.*?;base64,`, 'gi');
  let ext = req.body.image.match(regex);
  ext = '.' + ext[0].substring(ext[0].indexOf('/') + 1, ext[0].indexOf(';'));

  // make new buffer from file url string
  const imgBuffer = new Buffer.from(req.body.image.replace(regex, ''), 'base64url');
  let filePath = req.body.fileName;

  if (!filePath.includes('.')) filePath += ext;

  console.log(filePath);

  // save buffer/file to fs
  await fs.writeFile(filePath, imgBuffer);
  await fs.copyFile(filePath, 'colored-' + filePath);
  // run optimizations
  let imgProcessed = {};
  try {
    imgProcessed = await startProcessing(filePath);
  } catch (err) {
    res.json({ err });
  }

  res.json(imgProcessed);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running on :${port}`));

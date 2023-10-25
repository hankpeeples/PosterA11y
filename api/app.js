import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import startProcessing from './imageProcessing.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: ['localhost:3000', 'localhost:3001'] }));

app.post('/api/v1/analyze', async (req, res) => {
  const regex = new RegExp(`^data:.*?;base64,`, 'gi');
  // make new buffer from file url string
  const imgBuffer = new Buffer.from(req.body.image.replace(regex, ''), 'base64url');
  const filePath = req.body.fileName;
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

  try {
    let minData = {
      text: imgProcessed.text,
      contrast: imgProcessed.contrast,
    };

    await fs.writeFile('./results.json', new Buffer.from(JSON.stringify(minData), 'utf-8'));
    console.log('results written');
  } catch (err) {
    console.log(err);
  }

  res.json(imgProcessed);
});

app.get('/api/v1/getScores', async (req, res) => {
  let ret;
  try {
    await fs.unlink('./results.json');
    const data = await fs.readFile('./results.json', 'utf-8');
    ret = JSON.parse(data);
  } catch (err) {
    res.sendStatus(500);
    console.log("results.json probably doesn't exist yet:", err.message);
  }
  res.json(ret);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running on :${port}`));

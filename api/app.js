import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.get('/api/v1/processPoster', (req, res) => {
  console.log(req.body)
  res.json({
    data: 'test',
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`API running on :${port}`));

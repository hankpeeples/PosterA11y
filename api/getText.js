import { createWorker } from 'tesseract.js';

const getText = async (image) => {
  const worker = await createWorker('eng', 1, {
    errorHandler: (err) => console.log(err),
    logger: ({ status, progress }) => {
      if (status === 'recognizing text') console.log(progress);
    },
  });

  let text = [];
  let bbox = [];
  try {
    const { data } = await worker.recognize(image, { rotateAuto: true });
    await worker.terminate();

    for (let line of data.lines) {
      console.log(`[${line.confidence}]: ${line.text}`);
      if (line.confidence > 70) {
        text.push(line.text);
      } else {
        bbox.push(line.bbox);
      }
    }
    return { text, bbox };
  } catch (err) {
    console.log(err);
  }
};

export default getText;

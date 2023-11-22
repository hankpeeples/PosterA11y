import { createWorker } from 'tesseract.js';

const getText = async (image) => {
  const worker = await createWorker('eng', 1, {
    errorHandler: (err) => console.log(err),
    logger: ({ status, progress }) => {
      if (status === 'recognizing text') console.log(progress);
    },
  });

  let Bbox = [];
  let Gbox = [];
  try {
    const { data } = await worker.recognize(image, { rotateAuto: true });
    await worker.terminate();

    let text = { len: data.lines.length, good: 0 };
    let count = 0;
    for (let line of data.lines) {
      if (line.text.startsWith('www')) {
        // run link checking
        const res = await fetch(line);
        if (res.status == 200 || res.status == 201) {
          text.good += 1;
        }
      }
      if (line.confidence > 70) {
        text.good += 1;
        Gbox.push(line.bbox);
      } else {
        Bbox.push(line.bbox);
      }
    }
    return { text, Bbox, Gbox };
  } catch (err) {
    console.log(err);
  }
};

export default getText;

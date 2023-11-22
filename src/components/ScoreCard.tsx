import ScorePie from './ScorePie';

type ScoreData = {
  text: {
    len: number;
    good: number;
  };
  contrast: number;
};

const ScoreCard = (scores: ScoreData) => {
  let overall = 0;
  let text = 0;

  if (scores.text.len) {
    if (scores.text.good > scores.text.len / 2 - 2)
      scores.text.good += (scores.text.len - scores.text.good) / 2;
    text = (scores.text.good / scores.text.len) * 100;
    overall = (text + scores.contrast) / 2;
  }

  return (
    <div className="mb-4 flex h-fit w-full flex-col items-center rounded-md border-[1px] border-gray-400 p-4">
      <h2 className="text-[1.5rem] font-bold text-black">Overall Score</h2>
      <ScorePie overall={overall} />
      <div className="flex flex-row items-center justify-around gap-36">
        <div className="flex flex-col items-center justify-center text-lg font-bold">
          <p>Text</p>
          <ScorePie textScore={text} />
        </div>
        <div className="flex flex-col items-center justify-center text-lg font-bold">
          <p>Contrast</p>
          <ScorePie contrastScore={scores.contrast} />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

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
    <div className="flex flex-col p-4 mb-4 w-full rounded-md h-fit border-[1px]">
      <h2 className="font-bold text-black text-[1.5rem]">Your Score</h2>
      <div className="flex flex-row justify-between items-center">
        <ScorePie overall={overall} />
        <div className="flex flex-col justify-center items-center text-lg font-bold">
          <p>Text</p>
          <ScorePie textScore={text} />
        </div>

        <div className="flex flex-col justify-center items-center text-lg font-bold">
          <p>Contrast</p>
          <ScorePie contrastScore={scores.contrast} />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

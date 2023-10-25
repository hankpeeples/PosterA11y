import { useEffect, useState } from 'react';
import ScorePie from './ScorePie';

type Props = {
  done: boolean;
};

type ScoreData = {
  text: number;
  contrast: number;
};

const ScoreCard = ({ done }: Props) => {
  const overall = 0;
  const [scores, setScores] = useState<ScoreData>({ text: 0, contrast: 0 });
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/getScores').then(async (res) => {
      const data = await res.json();
      const textScore = (data.text.good / data.text.len) * 100;
      setScores({ text: textScore, contrast: data.contrast });
      setIsDone(true);
    });
    console.log(scores);
  }, [done, scores]);

  return (
    <div className="flex h-full w-full flex-col rounded-md border-[1px] border-dashed border-gray-400 p-4">
      <h2 className="text-[1.5rem] font-bold text-black">Your Score</h2>
      {isDone && (
        <>
          <ScorePie done={isDone} overall={overall} />
          <div className="flex h-[40%] grid-flow-row grid-cols-2 flex-row">
            <div className="flex flex-col items-center justify-center text-lg font-bold">
              <p>Text</p>
              <ScorePie done={isDone} textScore={scores.text} />
            </div>

            <div className="flex flex-col items-center justify-center text-lg font-bold">
              <p>Contrast</p>
              <ScorePie done={isDone} contrastScore={scores.contrast} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreCard;

import { useEffect, useState } from 'react';
import { VictoryAnimation, VictoryLabel, VictoryPie } from 'victory';

type Props = {
  text: string;
  contrast: boolean;
};

type ScoreData = {
  grade: number;
  data: { x: number; y: number }[];
};

const ScoreCard = ({ text, contrast }: Props) => {
  const getData = (percent: number) => {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  };

  const [scoreData, setScoreData] = useState<ScoreData>({ grade: 0, data: getData(0) });

  useEffect(() => {
    setScoreData({ grade: 70, data: getData(70) });
  }, []);

  return (
    <div className="flex flex-col p-4 w-full h-full rounded-md border-gray-400 border-dashed border-[1px]">
      <h2 className="font-bold text-black text-[1.5rem]">Your Score</h2>
      <div className="w-full h-full">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400}
            height={400}
            data={scoreData.data}
            innerRadius={80}
            cornerRadius={6}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  let color = '#FF6961';
                  if (datum.y >= 40 && datum.y <= 65) color = '#fffa6d';
                  if (datum.y >= 66) color = '#77dd77';
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={scoreData.data}>
            {() => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(scoreData.grade)}`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    </div>
  );
};

export default ScoreCard;

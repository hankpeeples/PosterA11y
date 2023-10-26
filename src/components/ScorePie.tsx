import { useEffect, useState } from 'react';
import { VictoryAnimation, VictoryLabel, VictoryPie } from 'victory';

type Props = {
  overall?: number;
  textScore?: number;
  contrastScore?: number;
};

type ScoreData = {
  grade: number;
  data: { x: number; y: number }[];
};

const ScorePie = ({ overall, textScore, contrastScore }: Props) => {
  let score: number = 0;

  if (textScore) score = textScore;
  else if (contrastScore) score = contrastScore;
  else if (overall) score = overall;

  const getData = (percent: number) => {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  };

  const [scoreData, setScoreData] = useState<ScoreData>({ grade: 0, data: getData(0) });

  useEffect(() => {
    setScoreData({ grade: score, data: getData(score) });
  }, [score]);

  return (
    <svg viewBox="0 0 400 400" width="15rem" height="15rem">
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
              if (datum.y >= 40 && datum.y <= 70) color = '#d8d231';
              if (datum.y >= 71) color = '#77dd77';
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
  );
};

export default ScorePie;

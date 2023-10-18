type Props = {
  text: string;
  contrast: boolean;
};

const ScoreCard = ({ text, contrast }: Props) => {
  return (
    <div className="flex flex-col justify-center w-full h-full rounded-md border-gray-400 border-dashed border-[1px]">
      <p className="self-center text-black">Score Card</p>
      <p className="self-center text-black">{text}</p>
      <p className="self-center text-black">{contrast}</p>
    </div>
  );
};

export default ScoreCard;

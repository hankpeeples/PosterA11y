type Props = {
  image: string;
};

const TestImageDisplay = ({ image }: Props) => {
  return (
    <div>
      <img src={image} className="absolute left-[45%] top-10" />
    </div>
  );
};

export default TestImageDisplay;

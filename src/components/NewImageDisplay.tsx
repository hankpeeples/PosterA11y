type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-300 shadow-md shadow-[#898989]">
      <img src={image} className="block h-auto max-h-[90%] w-auto max-w-[90%]" />
      <img src={palette} className="block h-auto max-h-[20%] w-auto max-w-[90%]" />
    </div>
  );
};

export default NewImageDisplay;

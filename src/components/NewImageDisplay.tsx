type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="flex h-full w-full flex-row items-center rounded-md bg-gray-300 p-10 shadow-md shadow-[#898989]">
      <img src={image} className="block h-auto max-h-[90%] w-auto max-w-[70%]" />
      <img src={palette} className="block h-auto max-h-[20%] w-auto max-w-[60%] rotate-90" />
    </div>
  );
};

export default NewImageDisplay;

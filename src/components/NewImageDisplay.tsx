type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="mr-4 flex h-full w-full flex-row items-center justify-center overflow-auto rounded-md bg-gray-300 p-4 shadow-md shadow-[#898989]">
      <img src={image} className="flex w-auto h-auto bg-black" />
      <img src={palette} className="flex w-auto h-auto rotate-90" />
    </div>
  );
};

export default NewImageDisplay;

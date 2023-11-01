type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="flex flex-row justify-center items-center mr-4 w-full h-full">
      {image && (
        <>
          <div className="flex w-3/4 h-full">
            <img src={image} className="flex w-full h-full" />
          </div>
          <div className="flex flex-col justify-center items-center w-1/4 h-full font-bold text-gray-900">
            <p className="mb-12">Color Palette</p>
            <img
              src={palette}
              className="flex h-[15%] w-full rotate-90 rounded-md border-[2px] border-solid border-black"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NewImageDisplay;

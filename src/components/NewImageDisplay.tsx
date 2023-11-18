type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="mr-4 flex h-full w-full flex-row items-center justify-center">
      {image && (
        <div className="flex h-full w-full flex-col">
          <img src={image} className="flex h-full w-full pb-2" />
          <img
            src={palette}
            className="flex h-[5%] w-full rounded-md border-[2px] border-solid border-black"
          />
        </div>
      )}
    </div>
  );
};

export default NewImageDisplay;

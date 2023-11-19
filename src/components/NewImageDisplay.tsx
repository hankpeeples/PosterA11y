type Props = {
  image: string;
  palette: string;
};

const NewImageDisplay = ({ image, palette }: Props) => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-center pl-4 pr-4">
      {image && (
        <div className="flex h-full w-full flex-col">
          <img src={image} className="flex h-full w-full pb-2" />
          <img
            src={palette}
            className="flex h-[4rem] w-full rounded-md border-[2px] border-solid border-black"
          />
        </div>
      )}
    </div>
  );
};

export default NewImageDisplay;

import { useState } from 'react';
import { UploadedFile } from '../utils/types';
import ExplanationCard from './ExplanationCard';
import FileUploader from './FileUploader';
import NewImageDisplay from './NewImageDisplay';
import ScoreCard from './ScoreCard';

const Home = () => {
  const [file, setFile] = useState<UploadedFile>({
    fileName: null,
    imageData: '',
    newImageData: {
      contrast: 0,
      text: {
        len: 0,
        good: 0,
      },
      newImage: '',
      palette: '',
    },
  });

  return (
    <div className="m-4">
      <div className="flex flex-col">
        <FileUploader fileSetter={setFile} file={file} />
        <ScoreCard text={file.newImageData.text} contrast={file.newImageData.contrast} />
      </div>
      <div className="flex flex-row h-[50rem]">
        <NewImageDisplay image={file.newImageData.newImage} palette={file.newImageData.palette} />
        <ExplanationCard />
      </div>
    </div>
  );
};

export default Home;

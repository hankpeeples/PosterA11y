import { useState } from 'react';
import { UploadedFile } from '../utils/types';
import ExplanationCard from './ExplanationCard';
import FileUploader from './FileUploader';
import NewImageDisplay from './NewImageDisplay';
import ScoreCard from './ScoreCard';

const Home = () => {
  const [file, setFile] = useState<UploadedFile>({
    fileName: '',
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
    <div className="m-4 mr-auto ml-auto max-w-[1600px]">
      <FileUploader fileSetter={setFile} file={file} />
      <div className="flex flex-row h-[50rem]">
        <ScoreCard text={file.newImageData.text} contrast={file.newImageData.contrast} />
        <NewImageDisplay image={file.newImageData.newImage} palette={file.newImageData.palette} />
      </div>
    </div>
  );
};

export default Home;

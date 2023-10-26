import { useEffect, useState } from 'react';
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

  useEffect(() => {}, [file]);

  return (
    <div className="grid gap-4 m-4">
      <FileUploader fileSetter={setFile} file={file} />
      <ScoreCard text={file.newImageData.text} contrast={file.newImageData.contrast} />
      <div className="flex flex-row">
        <NewImageDisplay image={file.newImageData.newImage} palette={file.newImageData.palette} />
        <ExplanationCard />
      </div>
    </div>
  );
};

export default Home;

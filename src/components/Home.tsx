import { useState } from 'react';
import { UploadedFile } from '../utils/types';
import ExplanationCard from './ExplanationCard';
import FileUploader from './FileUploader';
import NewImageDisplay from './NewImageDisplay';
import ScoreCard from './ScoreCard';
import ReactLoading from 'react-loading';

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
    loading: false,
  });

  return (
    <div className="m-4 ml-auto mr-auto max-w-[1300px]">
      <FileUploader fileSetter={setFile} file={file} />
      <div className="flex flex-row">
        <ScoreCard text={file.newImageData.text} contrast={file.newImageData.contrast} />
        {file.loading ? (
          <div className="mt-12 flex h-full w-full flex-col items-center justify-center pl-4 pr-4">
            <p>Loading image data...</p>
            <ReactLoading type="bars" color="#1f1f1f" height={20} width={90} />
          </div>
        ) : (
          <NewImageDisplay image={file.newImageData.newImage} palette={file.newImageData.palette} />
        )}
      </div>
    </div>
  );
};

export default Home;

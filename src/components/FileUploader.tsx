import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImageAnalysis } from '../utils/fileFetchHelper';
import TestImageDisplay from './testImageDisplay';

export type ImgData = {
  contrast: boolean;
  text: string;
  newImage: string;
  palette: string;
};

const FileUploader = () => {
  type UploadedFile = {
    fileName: string | null;
    imageData: string;
    newImageData: ImgData;
  };

  const [file, setFile] = useState<UploadedFile>({
    fileName: null,
    imageData: '',
    newImageData: {
      contrast: false,
      text: '',
      newImage: '',
      palette: '',
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const reader = new FileReader();

    // if FileReader aborts
    reader.onabort = (err) => {
      console.error(err);
      toast.error('File reading was aborted.');
    };
    // if FileReader errors while reading
    reader.onerror = (err) => {
      console.error(err);
      toast.error('File reading has failed.');
    };
    // once FileReader is done reading file contents
    reader.onloadend = async () => {
      const dataURL: string | null = typeof reader.result === 'string' ? reader.result : null;

      if (dataURL !== null) {
        setFile({
          fileName: acceptedFiles[0].name,
          imageData: dataURL,
          newImageData: {
            contrast: false,
            text: '',
            newImage: '',
            palette: '',
          },
        });
        toast.success('File uploaded successfully! Starting analysis...');
        let { contrast, text, newImage, palette }: ImgData = await fetchImageAnalysis(
          dataURL,
          acceptedFiles[0].name
        );
        setFile({
          fileName: acceptedFiles[0].name,
          imageData: dataURL,
          newImageData: {
            contrast,
            text,
            newImage,
            palette,
          },
        });
      } else {
        console.error('dataURL is null, unable to load');
        toast.error('Unable to load file.');
      }
    };

    // read file as data URL and will trigger one of the above 'reader.on*'
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex h-[49%] w-full flex-col justify-center sm:h-full sm:w-[49%]">
      <div
        className="flex justify-center items-center w-full h-full rounded-md border-gray-400 border-dashed transition-all duration-150 ease-in-out cursor-pointer hover:bg-gray-200 border-[1px]"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file.imageData !== '' ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-row justify-center items-center w-full h-full">
              <img
                alt="Original Image"
                src={file.imageData}
                className="block h-auto max-h-[90%] w-auto max-w-[90%]"
              />
            </div>
          </div>
        ) : (
          <p className="font-semibold text-gray-400">Click to select file</p>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          draggable={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          pauseOnHover={true}
        />
      </div>
      <p className="text-sm text-gray-400">
        Filename: {file.fileName !== '' ? file.fileName : null}
      </p>
      <TestImageDisplay image={file.newImageData.newImage} />
      <TestImageDisplay image={file.newImageData.palette} />
    </div>
  );
};

export default FileUploader;

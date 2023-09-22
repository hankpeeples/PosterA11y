import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { optimizer } from '../utils/fileOptimizer';

const FileUploader = () => {
  type UploadedFile = {
    fileName: string | null;
    imageData: string;
    newImageData: string;
  };

  const [file, setFile] = useState<UploadedFile>({
    fileName: null,
    imageData: '',
    newImageData: '',
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
          newImageData: '',
        });
        toast.success('File uploaded successfully! Starting analysis...');
        let newImageData = await optimizer(dataURL, acceptedFiles[0].name);
        setFile({
          fileName: acceptedFiles[0].name,
          imageData: dataURL,
          newImageData: newImageData,
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
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border-[1px] 
          border-dashed border-gray-400 transition-all duration-150 ease-in-out hover:bg-gray-200"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file.imageData !== '' ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-full w-full flex-row items-center justify-center">
              <img
                alt="Original Image"
                src={file.imageData}
                className="block h-auto max-h-[90%] w-auto max-w-[90%]"
              />
              {file.newImageData !== '' ? (
                <img
                  alt="New Image"
                  src={file.newImageData}
                  className="block h-auto max-h-[70%] w-auto max-w-[70%]"
                />
              ) : null}
            </div>
            <p className="text-sm text-gray-400">{file.fileName}</p>
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
    </div>
  );
};

export default FileUploader;

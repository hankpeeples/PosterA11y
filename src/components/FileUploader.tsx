import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUploader = () => {
  type UploadedFile = {
    fileName: string | null;
    imageData: string;
  };

  const [file, setFile] = useState<UploadedFile>({ fileName: null, imageData: '' });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();

      reader.onabort = () => toast.error('File reading was aborted.');
      reader.onerror = () => toast.error('File reading has failed.');
      reader.onload = () => {
        const dataURL: string | null = typeof reader.result === 'string' ? reader.result : null;

        if (dataURL !== null) {
          setFile({ fileName: acceptedFiles[0].name, imageData: dataURL });
          toast.success('File uploaded successfully! Starting analysis...');
        } else {
          toast.error('Unable to load file.');
        }
      };

      reader.readAsDataURL(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col h-[49%] sm:h-full w-full sm:w-[49%] justify-center">
      <div
        className="flex w-full h-full items-center justify-center border-[1px] border-gray-400 border-dashed 
          rounded-md hover:bg-gray-200 transition-all duration-150 ease-in-out cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file.imageData !== '' ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img src={file.imageData} className="block max-w-[90%] max-h-[90%] w-auto h-auto" />
            <p className="text-sm text-gray-400">{file.fileName}</p>
          </div>
        ) : (
          <p className="font-semibold text-gray-400">
            Drag 'n' drop a file here, or click to select file
          </p>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          draggable={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          pauseOnHover={true}
          // theme="colored"
        />
      </div>
    </div>
  );
};

export default FileUploader;

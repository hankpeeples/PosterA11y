import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUploader = () => {
  const [file, setFile] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => toast.error('File reading was aborted.');
    reader.onerror = () => toast.error('File reading has failed.');
    reader.onload = () => {
      const dataURL: string | null = typeof reader.result === 'string' ? reader.result : null;

      if (dataURL !== null) {
        setFile(dataURL);
        toast.success('File uploaded successfully...');
      } else {
        toast.error('Unable to load file.');
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col h-[49%] sm:h-full w-full sm:w-[49%] justify-center">
      <div
        className="flex items-center justify-center w-full h-full border-[1px] border-gray-400 border-dashed 
          rounded-md hover:bg-gray-200 transition-all duration-150 ease-in-out cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {file ? (
          <img src={file} className="block max-w-[95%] max-h-[95%] w-auto h-auto" />
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          draggable={false}
          closeOnClick={false}
        />
      </div>
    </div>
  );
};

export default FileUploader;

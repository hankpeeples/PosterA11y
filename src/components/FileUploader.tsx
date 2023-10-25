import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImageAnalysis } from '../utils/fileFetchHelper';
import { ImgData, UploadedFile } from '../utils/types';

const FileUploader = () => {
  const hiddenFileInput = useRef(null);
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<UploadedFile>({
    fileName: null,
    imageData: '',
    newImageData: {
      contrast: 0,
      text: 0,
      newImage: '',
      palette: '',
    },
  });

  const runFileUpload = () => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (event: any) => {
    uploadImage(event.target.files);
  };

  const uploadImage = useCallback(async (uploadedImage) => {
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
          fileName: uploadedImage[0].name,
          imageData: dataURL,
          newImageData: {
            contrast: 0,
            text: 0,
            newImage: '',
            palette: '',
          },
        });
        toast.success('File uploaded successfully! Starting analysis...');
        let { contrast, text, newImage, palette }: ImgData = await fetchImageAnalysis(
          dataURL,
          uploadedImage[0].name
        );
        setFile({
          fileName: uploadedImage[0].name,
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
    reader.readAsDataURL(uploadedImage[0]);
  }, []);

  const urlInputHandler = async () => {
    try {
      const res = await fetch(url);
      console.log(res);
      if (res.status === 200) {
        const imageBlob = await res.blob();
        setFile({
          fileName: 'Uploaded via image URL',
          imageData: URL.createObjectURL(imageBlob),
          newImageData: {
            contrast: 0,
            text: 0,
            newImage: '',
            palette: '',
          },
        });
        toast.success('URL received successfully! Starting analysis...');
        let { contrast, text, newImage, palette }: ImgData = await fetchImageAnalysis(
          file.imageData,
          file.fileName
        );
        setFile({
          fileName: file.fileName,
          imageData: file.imageData,
          newImageData: {
            contrast,
            text,
            newImage,
            palette,
          },
        });
      }
    } catch (err) {
      toast.error('That URL does not appear to be valid...');
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-row items-center justify-between rounded-md border-[1px] border-dashed border-gray-400 p-4">
        <div className="flex flex-row items-center">
          <input
            type="file"
            name="image uploader"
            accept="image/*"
            onChange={handleFileUpload}
            ref={hiddenFileInput}
            className="hidden"
          />
          <button
            onClick={runFileUpload}
            className="rounded-md border-[1px] border-black pb-1 pl-2 pr-2 pt-1 shadow-sm shadow-black transition duration-200 ease-in-out hover:shadow-none"
          >
            Choose image...
          </button>
          <p className="pl-4 text-lg text-gray-500">
            {!file.fileName ? 'No file selected' : file.fileName}
          </p>
        </div>
        <div className="flex flex-row items-center">
          <p className="pr-4 text-lg text-gray-500">Or enter an image url here</p>
          <input
            type="url"
            name="image url uploader"
            onChange={(e) => setUrl(e.target.value)}
            className="w-[30rem] rounded-md rounded-br-none rounded-tr-none border-[1px] border-black border-r-transparent pb-1 pl-2 pr-2 pt-1 shadow-sm shadow-black transition duration-200 ease-in-out"
          />
          <button
            onClick={urlInputHandler}
            className="rounded-md rounded-bl-none rounded-tl-none border-[1px] border-black border-l-transparent bg-white pb-1 pl-2 pr-2 pt-1 font-bold text-gray-500 shadow-sm shadow-black transition duration-200 ease-in-out"
          >
            Go
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        draggable={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
      />
    </>
  );
};

export default FileUploader;

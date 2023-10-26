import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImageAnalysis } from '../utils/fileFetchHelper';
import { ImgData, UploadedFile } from '../utils/types';

type Props = {
  fileSetter: React.Dispatch<React.SetStateAction<UploadedFile>>;
  file: UploadedFile;
};

const FileUploader = ({ fileSetter, file }: Props) => {
  const hiddenFileInput = useRef(null);
  const [url, setUrl] = useState<string>('');

  const runFileUpload = () => {
    // @ts-ignore: Possibly null error
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
        fileSetter({
          fileName: uploadedImage[0].name,
          imageData: dataURL,
          newImageData: {
            contrast: 0,
            text: { len: 0, good: 0 },
            newImage: '',
            palette: '',
          },
        });
        toast.success('File uploaded successfully! Starting analysis...');
        let { contrast, text, newImage, palette }: ImgData = await fetchImageAnalysis(
          dataURL,
          uploadedImage[0].name
        );
        fileSetter({
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
    // 'new URL(url)' will error with an invalid URL so just catch to validate
    try {
      new URL(url);
    } catch (_) {
      toast.error(`"${url}" is not a valid URL.`);
      return;
    }

    try {
      console.log(url);
      const res = await axios.get(url);
      console.log(res);
      if (res.status === 200) {
        const imageBlob = await res.blob();
        fileSetter({
          fileName: 'Uploaded via image URL',
          imageData: URL.createObjectURL(imageBlob),
          newImageData: {
            contrast: 0,
            text: { len: 0, good: 0 },
            newImage: '',
            palette: '',
          },
        });
        toast.success('URL received successfully! Starting analysis...');
        let { contrast, text, newImage, palette }: ImgData = await fetchImageAnalysis(
          file.imageData,
          file.fileName
        );
        fileSetter({
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
      toast.error('Something went wrong when grabbing the image.');
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 w-full h-full rounded-md border-gray-400 border-dashed border-[1px]">
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
            className="pt-1 pr-2 pb-1 pl-2 rounded-md border-black shadow-sm transition duration-200 ease-in-out hover:shadow-none border-[1px] shadow-black"
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
            className="pt-1 pr-2 pb-1 pl-2 rounded-md rounded-tr-none rounded-br-none border-black shadow-sm transition duration-200 ease-in-out w-[30rem] border-[1px] border-r-transparent shadow-black"
          />
          <button
            onClick={urlInputHandler}
            className="pt-1 pr-2 pb-1 pl-2 font-bold text-gray-500 bg-white rounded-md rounded-tl-none rounded-bl-none border-black shadow-sm transition duration-200 ease-in-out border-[1px] border-l-transparent shadow-black"
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

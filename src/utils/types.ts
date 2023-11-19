export type ImgData = {
  contrast: number;
  text: {
    len: number;
    good: number;
  };
  newImage: string;
  palette: string;
};

export type UploadedFile = {
  fileName: string;
  imageData: string;
  newImageData: ImgData;
  loading: boolean;
};

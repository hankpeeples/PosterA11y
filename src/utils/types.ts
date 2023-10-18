export type ImgData = {
  contrast: boolean;
  text: string;
  newImage: string;
  palette: string;
};

export type UploadedFile = {
  fileName: string | null;
  imageData: string;
  newImageData: ImgData;
};

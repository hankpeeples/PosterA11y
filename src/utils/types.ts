export type ImgData = {
  contrast: number;
  text: number;
  newImage: string;
  palette: string;
};

export type UploadedFile = {
  fileName: string | null;
  imageData: string;
  newImageData: ImgData;
};

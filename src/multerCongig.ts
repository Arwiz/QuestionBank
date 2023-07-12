import { diskStorage } from 'multer';

export const multerOptions = {
  dest: './uploads',
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Set the file name for uploaded files
    },
  }),
};

import multer from 'multer';
import { Request, Response } from 'express';
import path from 'path';
import { BaseError } from '../../utils';
import { HttpStatusCodes } from '../../constants';
import { RequestWithUserAndFile } from '../../middleware/types';

export const storeFile = async (
  storePath: string,
  fieldname: string,
  request: RequestWithUserAndFile,
  res: Response,
  acceptedExt: string[]
) => {
  return new Promise((resolve, reject) => {
    const storage = multerConfig(storePath);
    const upload = multer({
      storage,
      fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname).toUpperCase();
        if (acceptedExt.includes(ext)) {
          return callback(null, true);
        }

        const error = new BaseError(
          HttpStatusCodes.BAD_REQUEST,
          'BAD REQUEST',
          'hubo un error a la hora de cargar los archivos.',
          req
        );
        return callback(error);
      },
    }).single(fieldname);

    upload(request, res, (error) => {
      if (error || request.file === undefined) {
        reject(
          new BaseError(
            HttpStatusCodes.BAD_REQUEST,
            'BAD REQUEST',
            error || 'Las entradas son invalidas o no existe archivo alguno que subir.'
          )
        );
      }
      resolve(request.file);
    });
  });
};

const multerConfig = (path: string) => {
  let filename = '';

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const regex = /\.[A-Z,a-z]{3,4}/;
      filename = `${file.fieldname}-${Date.now()}${file.originalname.match(regex)}`;
      cb(null, filename);
    },
  });

  return storage;
};

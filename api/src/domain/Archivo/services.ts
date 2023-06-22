import { Response } from 'express';
import { Keys } from '../../constants';
import { RequestWithUserAndFile } from '../../middleware/types';
import { TareaServices } from '../Tarea';
import { storeFile } from './multer-config';
import { ArchivoRepository } from './repository';
import { buildFileRouter } from './utils';
import { ArchivoDbServices } from './db-services';
import { Archivo, ArchivoStorage } from './model';

const tareaServices = new TareaServices();

export class ArchivoServices implements ArchivoRepository {
  async upload(req: RequestWithUserAndFile, res: Response): Promise<number> {
    const user = req.user;
    const id = parseInt(req.params.tareaId);

    const task = await tareaServices.getById(id, user!!.id!!);

    if (task.publica !== Keys.privacyStatus.public) {
      await tareaServices.verifySharedUser(user!!.id!!, id);
    }

    let newFile = 0;

    const fileRouter = buildFileRouter('tareas', id);

    const storage: ArchivoStorage = (await storeFile(
      fileRouter,
      'file',
      req,
      res,
      Keys.acceptedExt
    )) as ArchivoStorage;

    if (storage) {
      const oldFile = await ArchivoDbServices.getArchivoByTareaId(id);

      const newFileBody = {
        nombre: storage.filename,
        ruta: storage.path,
        tipo: storage.filename.split('.').pop()!!,
        meta: JSON.stringify(storage),
        tarea_id: id,
      };

      if (oldFile) {
        newFile = await ArchivoDbServices.updateArchivo(oldFile.id, newFileBody);
      } else {
        newFile = await ArchivoDbServices.create(newFileBody);
      }
    }

    return newFile;
  }
}

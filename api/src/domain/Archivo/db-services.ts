import { db } from '../../database';

export class ArchivoDbServices {
  static async getArchivoByTareaId(tareaId: number): Promise<any> {
    const archivo = await db('archivos').where({ tarea_id: tareaId }).first();
    return archivo;
  }

  static async updateArchivo(id: number, archivo: any): Promise<number> {
    const updatedArchivo = await db('archivos').where({ id }).update(archivo);

    return updatedArchivo;
  }

  static async create(archivo: any): Promise<number> {
    const newArchivo = await db('archivos').insert(archivo);
    return newArchivo[0];
  }
}

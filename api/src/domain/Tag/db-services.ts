import { db } from '../../database';
import { Tag, TagToDb } from './model';

export class TagDbServices {
  static async create(tags: TagToDb[]): Promise<number[]> {
    const newTags = await db('tags').insert(tags);

    return newTags;
  }

  static async removeTags(tareaId: number): Promise<void> {
    await db('tags').where({ tarea_id: tareaId }).del();
  }
}

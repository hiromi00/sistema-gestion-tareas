import { Tag, TagToDb } from './model';

export const setTaskIdToTags = (tareaId: number, tags: Tag[]): TagToDb[] => {
  return tags.map((tag) => ({ ...tag, tarea_id: tareaId }));
};

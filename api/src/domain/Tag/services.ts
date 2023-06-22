import { TagDbServices } from './db-services';
import { Tag, TagToDb } from './model';
import { TagRepository } from './repository';
import { setTaskIdToTags } from './utils';

export class TagServices implements TagRepository {
  async create(tags: Tag[], tareaId: number): Promise<number[]> {
    const tagsToDb = setTaskIdToTags(tareaId, tags);

    const newTags = await TagDbServices.create(tagsToDb);

    let tagsIds: number[] = [newTags[0]];
    for (let i = 1; i < tags.length; i++) {
      tagsIds.push(tagsIds[0] + 1);
    }
    return tagsIds;
  }
}

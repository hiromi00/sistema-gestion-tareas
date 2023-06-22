export type TareaRepository = {
  create: Function;
  remove: Function;
  update: Function;
  getAll: Function;
  getById: Function;
  verifySharedUser: Function;
  complete: Function;
};

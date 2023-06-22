export type UsuarioRepository = {
  getById: Function;
  findSharedList: Function;
  findUserInSharedList: Function;
  findByEmail: Function;
  login: Function;
};

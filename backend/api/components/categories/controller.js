const ID = 'Id_Category';
const TABLA = 'categories';

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
      store = require('../../../store/dummy');
  }

  function getAll(){
      return store.getAll(TABLA);
  }

  function findId(id) {
      return store.findId(TABLA, ID, id);
  }

  return {
    getAll,
    findId
  }

};

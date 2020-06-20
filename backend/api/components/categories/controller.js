const TABLA = 'categories';
const FIELDS = ['Id_Category', 'Category'];

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
      store = require('../../../store/dummy');
  }
  
  function getAll(fields){
    fields = fields ? fields : FIELDS;
    return store.getAll(TABLA, fields);
  }

  function findId(id, fields) {
    fields = fields ? fields : FIELDS;
    return store.findId(TABLA,{Id_Category: id},fields);
  }

  return {
    getAll,
    findId
  }

};

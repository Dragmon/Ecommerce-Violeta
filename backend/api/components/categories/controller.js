const TABLA = 'categories';
const NameIdTable = 'Id_Category';
const FIELDS = ['Id_Category', 'Category','Image'];

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function getAll(fields) {
    fields = fields ? fields : FIELDS;
    return await store.getAll(TABLA, fields);
  }

  async function findId(id, fields) {
    fields = fields ? fields : FIELDS;
    return await store.findId(TABLA, { Id_Category: id }, fields);
  }

  async function upsert(body) {
    if (body.Category) {
      let category = {
        Category: body.Category
      }

      if (body.Id_Category) {
        category.Id_Category= body.Id_Category;
      }
      return await store.upsert(TABLA, category, NameIdTable);
    }
    return {};
  }
  async function remove(id) {
    return await store.remove(TABLA, { Id_Category: id }, NameIdTable);
  }

  return {
    getAll,
    findId,
    upsert,
    remove,
  };
};

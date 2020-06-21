const TABLA = 'countries';
const NameIdTable = 'Id_Country';
const FIELDS = ['Id_Country', 'Country'];

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
    return await store.findId(TABLA, { Id_Country: id }, fields);
  }

  async function upsert(body) {
    if (body.Country) {
      let data = {
        Country: body.Country
      }

      if (body.Id_Country) {
        data.Id_Country= body.Id_Country;
      }
      return await store.upsert(TABLA, data, NameIdTable);
    }
    return {};
  }
  async function remove(id) {
    return await store.remove(TABLA, { Id_Country: id }, NameIdTable);
  }

  return {
    getAll,
    findId,
    upsert,
    remove,
  };
};

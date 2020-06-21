const TABLA = 'cities';
const NameIdTable = 'Id_City';
const FIELDS = ['Id_City', 'City'];

module.exports = function (injectionStore) {
  let store = injectionStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function getAll(fields) {
    fields = fields ? fields : FIELDS;
    return await store.getAll(TABLA, fields);
  }

  async function findId(id, fields) {
    fields = fields ? fields : FIELDS;
    return await store.findId(TABLA, { Id_City: id }, fields);
  }
  async function findByIdState(id, fields) {
    fields = fields ? fields : FIELDS;
    return await store.findId(TABLA, { Fk_IdState: id }, fields);
  }
  async function upsert(body) {
    if (body.City) {
      let data = {
        City: body.City,
      };
      if (body.Fk_IdState) {
        data.Fk_IdState = body.Fk_IdState;
      }
      if (body.Id_City) {
        data.Id_City = body.Id_City;
      }
      return await store.upsert(TABLA, data, NameIdTable);
    }
    return {};
  }
  async function remove(id) {
    return await store.remove(TABLA, { Id_City: id }, NameIdTable);
  }
  return {
    getAll,
    findId,
    upsert,
    remove,
    findByIdState,
  };
};

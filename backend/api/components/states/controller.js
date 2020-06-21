const TABLA = 'states';
const NameIdTable = 'Id_State';
const FIELDS = ['Id_State', 'State'];

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
    return await store.findId(TABLA, { Id_State: id }, fields);
  }
  async function findByIdCountry(id, fields) {
    fields = fields ? fields : FIELDS;
    return await store.findId(TABLA, { Fk_IdCountry: id }, fields);
  }
  async function upsert(body) {
    if (body.State) {
      let data = {
        State: body.State,
      };
      if (body.Fk_IdCountry) {
        data.Fk_IdCountry = body.Fk_IdCountry;
      }
      if (body.Id_State) {
        data.Id_State = body.Id_State;
      }
      return await store.upsert(TABLA, data, NameIdTable);
    }
    return {};
  }
  async function remove(id) {
    return await store.remove(TABLA, { Id_State: id }, NameIdTable);
  }
  return {
    getAll,
    findId,
    upsert,
    remove,
    findByIdCountry,
  };
};

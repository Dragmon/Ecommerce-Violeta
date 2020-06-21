const TABLA = 'subcategories';
const NameIdTable = 'Id_Subcategory';
const FIELDS = ['Id_Subcategory', 'Subcategory'];

module.exports = function(injectionStore) {
    let store = injectionStore;
    if (!store) {
        store =  require('../../../store/dummy');
    }

    async function getAll(fields) {
        fields = fields ? fields : FIELDS;
        return await store.getAll(TABLA, fields);
    }
    
    async function findId(id, fields) {
      fields = fields ? fields : FIELDS;
      return await store.findId(TABLA, { Id_Subcategory: id }, fields);
    }
    async function findByIdCategory(id, fields) {
      fields = fields ? fields : FIELDS;
      return await store.findId(TABLA, { Fk_IdCategory: id }, fields);
    }
    async function upsert(body) {
        if (body.Subcategory) {
          let subcategory = {
            Subcategory: body.Subcategory
          }
          if (body.Fk_IdCategory) {
            subcategory.Fk_IdCategory= body.Fk_IdCategory;
          }
          if (body.Id_Subcategory) {
            subcategory.Id_Subcategory= body.Id_Subcategory;
          }
          return await store.upsert(TABLA, subcategory, NameIdTable);
        }
        return {};
      }
      async function remove(id) {
        return await store.remove(TABLA, { Id_Subcategory: id }, NameIdTable);
      }
    return {
        getAll,
        findId,
        upsert,
        remove,
        findByIdCategory
    }
}
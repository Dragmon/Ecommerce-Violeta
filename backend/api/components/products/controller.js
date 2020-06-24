const dateFormat =  require('dateformat');

const dataForm = require('../../../utils/dataForm');

const TABLA = 'products';
const NameIdTable = 'Id_Product';
const FIELDS = ['Id_Product', 'Title', 'Description','PromotionPrice','Active','Stock'];

//para hacer insert en la tabla de stock
const TABLA_STOCK = 'stock';
const NameIdTableStock = 'Id_Stock';
const FIELDS_STOCK = ['Quantity','Type'];
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
    return await store.findId(TABLA, { Id_Product: id }, fields);
  }

  async function upsert(body) {
    const date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    if (body.Title) {
      let data = { ...body } 
      
      let dataProduct = dataForm(data, FIELDS);
      let dataStock ;

      if (body.Id_Product) {
        dataProduct.Id_Product = body.Id_Product;
        dataProduct.UpdateAt = date;
      } else {
        dataProduct.CreatedAt = date;

        dataStock = dataForm(data, FIELDS_STOCK);
        dataStock.CreatedAt = date;
        dataStock.Type = dataStock.Type ? dataStock.Type : 'entrada';
      }
      const result = await store.upsert(TABLA, dataProduct, NameIdTable);

      if(dataStock){
        dataStock.Fk_IdProduct= result.insertId;
        await store.upsert(TABLA_STOCK, dataStock, NameIdTableStock);
      }
      return result;
    }
    return {};
  }
  async function remove(id) {
    return await store.remove(TABLA, { Id_Product: id }, NameIdTable);
  }
 
  return {
    getAll,
    findId,
    upsert,
    remove,
  };
};

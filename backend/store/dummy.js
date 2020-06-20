const categories = require('../utils/mocks/categories');
const subcategories = require('../utils/mocks/categories');
const products = require('../utils/mocks/categories');

const db = {
    categories,
    subcategories,
    products
}
async function getAll(table) {
    return db[table];
}

async function findId(table, idTable, id) {
    let col = await getAll(table);
    return col.filter(item => item[idTable] === Number(id))[0] || null;
}

async function upsert(table, data) {
    db[table].push(data);
}

async function remove() {
    return true;
}

module.exports = {
    getAll,
    findId,
    upsert,
    remove
}
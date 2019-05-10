/**
 * @author {[Monty Khanna]}
 */
const _getList = (table, query) => table.findAll(query);

const _getListWithCount = (table, query) => table.findAndCountAll(query);

const _add = (table, query) => new Promise((resolve, reject) => {
  table
    .create(query)
    .then(resolve)
    .catch(reject);
});

const _update = (table, payload, queryString) => new Promise((resolve, reject) => {
  table
    .update(payload, queryString)
    .then(resolve)
    .catch(reject);
});

const _delete = (table, queryString) => new Promise((resolve, reject) => {
  table
    .destroy(queryString)
    .then(resolve)
    .catch(reject);
});

module.exports = {
  _getList,
  _getListWithCount,
  _add,
  _update,
  _delete,
};

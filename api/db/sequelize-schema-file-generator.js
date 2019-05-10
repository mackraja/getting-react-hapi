/**
 * @author {[Monty Khanna]}
 */
const Sequelize = require('sequelize');
const fs = require('fs');
const models = require('./models');

delete models.default;

const sequelize = new Sequelize(
  'sakila',
  'root',
  'Bohemia007', {
    host: 'localhost',
    dialect: 'mysql',
  },
);

for (const model in models) {
  const attributes = models[model].attributes;

  for (const column in attributes) {
    delete attributes[column].Model;
    delete attributes[column].fieldName;
    delete attributes[column].field;
    for (const property in attributes[column]) {
      if (property.startsWith('_')) {
        delete attributes[column][property];
      }
    }

    if (typeof attributes[column].type !== 'undefined') {
      if (typeof attributes[column].type.options !== 'undefined' && typeof attributes[column].type.options.toString === 'function') {
        attributes[column].type.options = attributes[column].type.options.toString(sequelize);
      }

      if (typeof attributes[column].type.toString === 'function') {
        attributes[column].type = attributes[column].type.toString(sequelize);
      }
    }
  }

  let schema = JSON.stringify(attributes, null, 4);
  const tableName = models[model].tableName;
  const indexes = ['\n'];

  if (models[model].options.indexes && models[model].options.indexes.length) {
    models[model].options.indexes.forEach((obj) => {
      indexes.push('        .then(() => {');
      indexes.push('            return queryInterface.addIndex(');
      indexes.push(`                '${tableName}',`);
      indexes.push(`                ['${obj.fields.join('\',\'')}']`);

      const opts = {};
      if (obj.name) {
        opts.indexName = obj.name;
      }
      if (obj.unique === true) {
        opts.indicesType = 'UNIQUE';
      }
      if (obj.method === true) {
        opts.indexType = obj.method;
      }
      if (Object.keys(opts).length) {
        indexes.push(`                , ${JSON.stringify(opts)}`);
      }

      indexes.push('            )');
      indexes.push('        })');
    });
  }

  schema = schema.split('\n').map(line => `            ${line}`).join('\n');

  const template = `'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('${tableName}',
${schema})
        })${indexes.join('\n')}
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('${tableName}');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};`;

  const d = new Date();

  const filename = `${[d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(num => num <= 60 && (num + 100).toString().substring(1) || num)
    .join('')}-${models[model].tableName}`;

  fs.writeFileSync(`./db/migrations/${filename}.js`, template);
}

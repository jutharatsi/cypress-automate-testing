
const fs = require('fs-extra');
const path = require('path');
const mysql = require('mysql')

module.exports = (on, config) => {

  function processConfigName(on, config) {

    const file = config.env.name || "local"
    return getConfigFile(file).then(function (file) {
      //return file object
      return file;
    })
  }

  function getConfigFile(file) {
    const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
    return fs.readJson(pathToConfigFile)
  }

  //connect database start
  function queryTestDb(query, config) {
    const connection = mysql.createConnection(config.env.db)
    connection.connect()
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {

        if (error) reject(error)
        else {
          connection.end()
          return resolve(results)
        }
      })
    })
  }

  on('task', {
    queryDb: query => {
      return queryTestDb(query, config);
    },
  });
  //connect database end

  //Return the configuration file details
  return processConfigName(on, config);
}
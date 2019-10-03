'use strict';

const Hapi = require('@hapi/hapi');
const filepaths = require('filepaths');
const hapiBoomDecorators = require('hapi-boom-decorators');

const config = require('../config');

async function createServer() {
  // Инициализируем сервер
  const server = await new Hapi.Server(config.server);

  // Регистрируем расширение
  await server.register([
    hapiBoomDecorators
  ]);

  // Загружаем все руты из папки ./src/routes/
  let routes = filepaths.getSync(__dirname + '/routes/');
  for(let route of routes)
    server.route( require(route) );

  // Запускаем сервер
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch(err) { // если не смогли стартовать, выводим ошибку
    console.log(JSON.stringify(err));
  }

  // Функция должна возвращать созданый сервер
  return server;
}

module.exports = createServer;

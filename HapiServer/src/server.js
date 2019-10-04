'use strict';

const Hapi = require('@hapi/hapi');
const filepaths = require('filepaths');
const hapiBoomDecorators = require('hapi-boom-decorators');

let field = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

let currentPlayer = 1;

// const config = require('../config');

async function createServer() {
  // Инициализируем сервер
  const server = await new Hapi.server({
    host: 'localhost',
    port: 4000,
    routes: {
        cors: true
      }
  });

  // Регистрируем расширение
  await server.register([
    hapiBoomDecorators
  ]);

  server.route({
    method: 'POST',
    path: '/game',
    options: {
      cors: true,
      handler: (req, res) => {
        field = req.body;
        return(req.payload.field);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/game/status',
    handler: (request, response) => {
      return {
        field,
        currentPlayer
      };
    }
  });


// из презентации
  function getFreeCell(columnId) {
    return field[columnId].lastIndexOf(0);
}


  // Загружаем все руты из папки ./src/routes/
  // let routes = filepaths.getSync(__dirname + '/routes/');
  // for(let route of routes)
  // server.route( require(route) );

  // Запускаем сервер
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) { // если не смогли стартовать, выводим ошибку
    console.log(JSON.stringify(err));
  }

  // Функция должна возвращать созданый сервер
  return server;
}

module.exports = createServer;

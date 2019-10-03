async function response(){
  return {
    result:'OK',
    message: 'Hello world!'
  };
}

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: response
  }
};

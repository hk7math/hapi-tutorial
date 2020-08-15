require('dotenv').config()
const Hapi = require('@hapi/hapi')

const server = new Hapi.Server({
  host: process.env.HOST,
  port: process.env.PORT
})

server.route({
  method: 'GET',
  path: '/',
  handler: (req, h) => {
    return 'Hello Future Studio!'
  }
})

const start = async () => {
  try {
    await server.start()
  } catch (err) {
    console.log('err')
    process.exit(1)
  }

  console.log('Server running at: ', server.info.uri)
}

start()

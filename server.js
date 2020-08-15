require('dotenv').config()
const Hapi = require('@hapi/hapi')

const server = new Hapi.Server({
  host: process.env.HOST,
  port: process.env.PORT
})

server.route([
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Hello Future Studio!'
    }
  },
  {
    method: 'GET',
    path: '/page/{page}',
    handler: (req, h) => {
      return `Greeting from page ${encodeURIComponent(req.params.page)}`
    },
    config: {
      description: 'Sends a friendly greeting',
      notes: 'No route parameters available',
      tags: ['greeting']
    }
  }
])

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

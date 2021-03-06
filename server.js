require('dotenv').config()
const Hapi = require('@hapi/hapi')

const server = new Hapi.Server({
  host: process.env.HOST,
  port: process.env.PORT
})

const start = async () => {
  try {
    await server.register({
      plugin: require('@hapi/inert')
    })

    await server.route([
      {
        method: 'GET',
        path: '/',
        handler: (req, h) => {
          const query = req.query || {}
          console.log(query)
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
      },
      {
        method: 'GET',
        path: '/publics/{file*}',
        handler: {
          directory: {
            path: 'publics',
            listing: true,
            redirectToSlash: true
          }
        }
      },
      {
        method: 'GET',
        path: '/blog/{slug?}',
        handler: (req, h) => {
          const params = req.params || {}

          if (params.slug) {
            return 'blog/tutorial-details'
          }

          return 'blog/overview'
        }
      }
    ])

    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at: ', server.info.uri)
}

start()

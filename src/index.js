import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// *Change from import to commonJS require()
// *to avoid message "morgan deprecated default format: use combined format node_modules\esm\esm.js:1:278827"
// import morgan from 'morgan'
const morgan = require('morgan')

import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import colors from 'colors'

import connectDB from './config/db'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

// Config dotEnv
// dotenv.config()
dotenv.config({ path: './src/config/config.env' })
connectDB()

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000

const startServer = async () => {
  const app = express()
  // *Set up middleware
  // *Set up helmet
  app.use(helmet())
  // app.disable("x-powered-by")
  // *Set up Rate limit setup
  const limiter = new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 1500, // limit of number of request per IP
  })
  app.use(limiter)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    // app.use(
    //   morgan(
    //     ':method :url :status :response-time ms - :res[content-length] bytes'
    //       .blue
    //   )
    // )
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  }

  // *Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.applyMiddleware({ app })

  // *Set up Mongoose
  // await mongoose.connect('mongodb://mongo:27017/test3', {
  //   useNewUrlParser: true,
  //   poolSize: 10,
  //   keepAlive: true,
  //   keepAliveInitialDelay: 300000,
  // })

  // *Start express
  app.listen({ port: PORT }, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT} at http://localhost:${PORT}${server.graphqlPath}`
        .yellow.bold
    )
  })
}

startServer()

import { ApolloServer, gql } from "apollo-server-express"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import helmet from "helmet"

import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

//* Config dotEnv
dotenv.config()

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000

const startServer = async () => {
  const app = express()
  // !Set up middleware
  // *Set up helmet
  app.use(helmet())
  // app.disable("x-powered-by")
  // *Set up Rate limit setup
  const limiter = new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 1500 // limit of number of request per IP
  })
  app.use(limiter)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(
    morgan(
      ":method :url :status :response-time ms - :res[content-length] bytes"
    )
  )

  // *Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app })

  // *Set up Mongoose
  await mongoose.connect("mongodb://mongo:27017/test3", {
    useNewUrlParser: true,
    poolSize: 10,
    keepAlive: true,
    keepAliveInitialDelay: 300000
  })

  // *Start express
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  })
}

startServer()

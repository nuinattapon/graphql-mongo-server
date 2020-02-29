import mongoose from 'mongoose'
import dotenv from 'dotenv'

// * Config dotEnv
dotenv.config({ path: './src/config/config.env' })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      poolSize: 10,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold)
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    process.exit(1)
  }
}

export default connectDB

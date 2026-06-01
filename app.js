const mongoose = require ("mongoose")
const config = require ("./utils/config")
const logger = require ("./utils/logger")
const errorHandler = require ("./utils/middleware").errorHandler
const unknownEnding = require ("./utils/middleware").unknownEnding
const requestLogger = require ("./utils/middleware").requestLogger
const blogRouter = require ("./controlers/blogs")
const express = require ("express")
const app = express()
app.use(express.json())
mongoose.set("strictQuery", false)
logger.info("connecting ot MONGODB")
mongoose.connect(config.MONGODB_URI, { family: 4 }).then(
  () => { logger.info("connected to MONGODB")  }
).catch(error => logger.error(error.message))
app.use(requestLogger)

app.use("/api/blogs", blogRouter)
app.use(unknownEnding)
app.use(errorHandler)



module.exports= app
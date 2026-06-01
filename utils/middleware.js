const morgan = require ("morgan")
const logger = require ("./logger")
const requestLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req,res),
    tokens.status(req, res),
    tokens.url(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms"
  ].join(" ")
})

const unknownEnding = (req, res) => {
  return res.status(400).send({ error: "unknown ending" })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  if(error.name === "CastError"){ return res.status(400).send({ error: "malformated id" })}
  else if (error.name === "ValidationError"){ return res.status(400).json({ error: error.message })}
  next(error)
}

module.exports= { requestLogger, unknownEnding, errorHandler }
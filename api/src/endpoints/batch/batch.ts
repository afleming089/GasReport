// batch call google json style batch.
// reference https://developers.google.com/workspace/docs/api/how-tos/batch
// look up sub batches maybe. Look up if that a good practice
// maybe make this the only accessible route

// optional parameters
// fetch time

// add standard response here
// like api model on front end. if there is an error have it returned here

// add fetch time with this
// app.use(async (c, next) => {
//   const start = performance.now()
//   await next()
//   const end = performance.now()
//   c.res.headers.set('X-Response-Time', `${end - start}`)
// })

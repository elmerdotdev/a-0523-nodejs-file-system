const http = require('http')

const server = http.createServer((request, response) => {
  if (request.url === '/') {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.end('Homepage!')
  } else if (request.url === '/about') {
    response.writeHead(200, { 'Content-type': 'text/html' })
    response.end('<h1>About page</h1>')
  } else if (request.url === '/my-account') {
    response.writeHead(403, { 'Content-type': 'text/plain' })
    response.end('You are not allowed to view this page')
  } else if (request.url === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' })
    response.end(JSON.stringify([1, 2, 3]))
  } else {
    response.writeHead(404, { 'Content-type': 'text/html' })
    response.end('<h1>Page not found!</h1>')
  }
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
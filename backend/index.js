const http = require('http')
const url = require('url')
const { listFiles, readAFile, deleteAFile } = require('./utils/functions')

const server = http.createServer((req, res) => {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*') // allow all domains to access server
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // allow these methods to server
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // allow content types

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*', // allow all domains to access server
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // allow these methods to server
      'Access-Control-Allow-Headers': 'Content-Type', // allow content types
    })
    res.end()
    return
  }

  if (req.url === '/api/files') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(listFiles()))
  } else {
    // Parse url
    const parsedUrl = url.parse(req.url, true)
    const fileName = parsedUrl.query.filename
    
    if (fileName && req.method === 'GET') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(readAFile(fileName)))      
    } else if (fileName && req.method === 'DELETE') {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(deleteAFile(fileName)))
    } else {
      res.writeHead(404, { 'Content-type': 'text/plain' })
      res.end('Filename URL query not found')
    }
  }
})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server started in port ${PORT}...`)
})
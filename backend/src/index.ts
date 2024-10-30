import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { listFiles, readAFile, deleteAFile, createFile, updateFile } from './utils/functions';
import dotenv from 'dotenv'
dotenv.config()

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const fileName = parsedUrl.query.filename as string | undefined;

  if (req.url === '/api/files' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    listFiles().then(files => res.end(JSON.stringify(files)));
  } else if (fileName && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    readAFile(fileName).then(data => res.end(JSON.stringify(data)));
  } else if (fileName && req.method === 'DELETE') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    deleteAFile(fileName).then(deletedFile => res.end(JSON.stringify(deletedFile)));
  } else if (req.url === '/api/files' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const { filename, content } = JSON.parse(body);
      const success = await createFile(filename, content);
      if (success) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File created successfully' }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create file' }));
      }
    });
  } else if (fileName && req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const { content } = JSON.parse(body);
      const success = await updateFile(fileName, content);
      if (success) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File updated successfully' }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to update file' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

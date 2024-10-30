import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

const directory = 'docs';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/create') {
    const filename = 'newDocument.txt';
    const filePath = path.join(directory, filename);
    const fileContent = 'Hello from newDocument!';
    
    fs.writeFile(filePath, fileContent, 'utf8', (err) => {
      if (err) {
        console.error('Error: ', err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Error creating file');
        return;
      }
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end(`${filename} was created successfully...`);
    });
  } else if (req.url === '/read') {
    const filename = 'newDocument.txt';
    const filePath = path.join(directory, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error:', err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Error reading file');
        return;
      }
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end(data);
    });
  } else if (req.url === '/append') {
    const filename = 'newDocument.txt';
    const filePath = path.join(directory, filename);
    const fileContent = '\nLorem ipsum dolor et al';

    fs.appendFile(filePath, fileContent, 'utf8', (err) => {
      if (err) {
        console.error('Error: ', err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Error appending to file');
        return;
      }
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end(`Successfully added "${fileContent}" to ${filename}`);
    });
  } else if (req.url === '/delete') {
    const filename = 'newDocument.txt';
    const filePath = path.join(directory, filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error: ', err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Error deleting file');
        return;
      }
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end(`Successfully deleted ${filePath}`);
    });
  } else if (req.url === '/list') {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error('Error: ', err);
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading directory' }));
        return;
      }
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(files));
    });
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('API endpoint invalid');
  }
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});

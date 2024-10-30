"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const functions_1 = require("./utils/functions");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = http_1.default.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const fileName = parsedUrl.query.filename;
    if (req.url === '/api/files' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        (0, functions_1.listFiles)().then(files => res.end(JSON.stringify(files)));
    }
    else if (fileName && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        (0, functions_1.readAFile)(fileName).then(data => res.end(JSON.stringify(data)));
    }
    else if (fileName && req.method === 'DELETE') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        (0, functions_1.deleteAFile)(fileName).then(deletedFile => res.end(JSON.stringify(deletedFile)));
    }
    else if (req.url === '/api/files' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const { filename, content } = JSON.parse(body);
            const success = yield (0, functions_1.createFile)(filename, content);
            if (success) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File created successfully' }));
            }
            else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to create file' }));
            }
        }));
    }
    else if (fileName && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const { content } = JSON.parse(body);
            const success = yield (0, functions_1.updateFile)(fileName, content);
            if (success) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File updated successfully' }));
            }
            else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to update file' }));
            }
        }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});

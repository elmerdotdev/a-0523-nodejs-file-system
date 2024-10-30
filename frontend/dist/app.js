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
const filesList = document.querySelector('.files-list');
const fileForm = document.getElementById('file-form');
const filenameInput = document.getElementById('filename');
const contentInput = document.getElementById('file-content');
const fileContent = document.querySelector('.file-content');
const BACKEND_URL = 'http://localhost:3000/api';
// Get files from API
const getFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${BACKEND_URL}/files`);
    return yield res.json();
});
// Read file from API
const readFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${BACKEND_URL}/file?filename=${filename}`);
    const data = yield res.json();
    filenameInput.value = filename;
    contentInput.value = data;
});
// Delete file from API
const deleteFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`${BACKEND_URL}/file?filename=${filename}`, { method: 'DELETE' });
    buildList();
});
// Save file (create or update) to API
const saveFile = (filename, content) => __awaiter(void 0, void 0, void 0, function* () {
    const method = filenameInput.value ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `${BACKEND_URL}/file?filename=${filename}` : `${BACKEND_URL}/files`;
    yield fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content })
    });
    buildList();
});
// Event listener for form submission
fileForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield saveFile(filenameInput.value, contentInput.value);
}));
// Build and display the list of files
const buildList = () => __awaiter(void 0, void 0, void 0, function* () {
    filesList.innerHTML = '';
    const files = yield getFiles();
    files.forEach(file => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between');
        const fileSpan = document.createElement('span');
        fileSpan.textContent = file;
        fileSpan.classList.add('file-name');
        fileSpan.addEventListener('click', () => readFile(file));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.addEventListener('click', () => deleteFile(file));
        li.appendChild(fileSpan);
        li.appendChild(deleteBtn);
        filesList.appendChild(li);
    });
});
// Initial build of the file list
buildList();

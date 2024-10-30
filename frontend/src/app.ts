const filesList = document.querySelector('.files-list') as HTMLUListElement;
const fileForm = document.getElementById('file-form') as HTMLFormElement;
const filenameInput = document.getElementById('filename') as HTMLInputElement;
const contentInput = document.getElementById('file-content') as HTMLTextAreaElement;
const fileContent = document.querySelector('.file-content') as HTMLDivElement;

const BACKEND_URL = 'http://localhost:3000/api';

// Get files from API
const getFiles = async (): Promise<string[]> => {
  const res = await fetch(`${BACKEND_URL}/files`);
  return await res.json();
};

// Read file from API
const readFile = async (filename: string): Promise<void> => {
  const res = await fetch(`${BACKEND_URL}/file?filename=${filename}`);
  const data = await res.json();
  filenameInput.value = filename;
  contentInput.value = data;
};

// Delete file from API
const deleteFile = async (filename: string): Promise<void> => {
  await fetch(`${BACKEND_URL}/file?filename=${filename}`, { method: 'DELETE' });
  buildList();
};

// Save file (create or update) to API
const saveFile = async (filename: string, content: string): Promise<void> => {
  const method = filenameInput.value ? 'PUT' : 'POST';
  const url = method === 'PUT' ? `${BACKEND_URL}/file?filename=${filename}` : `${BACKEND_URL}/files`;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content })
  });
  buildList();
};

// Event listener for form submission
fileForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();
  await saveFile(filenameInput.value, contentInput.value);
});

// Build and display the list of files
const buildList = async (): Promise<void> => {
  filesList.innerHTML = '';
  const files = await getFiles();

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
};

// Initial build of the file list
buildList();

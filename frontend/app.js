const filesList = document.querySelector('.files-list')
const fileContent = document.querySelector('.file-content')

const BACKEND_URL = 'http://localhost:3000/api'

// Get files from API
const getFiles = async () => {
  const res = await fetch(`${BACKEND_URL}/files`)
  const data = await res.json()
  return data
}

// Read file from API
const readFile = async (filename) => {
  const res = await fetch(`${BACKEND_URL}/file?filename=${filename}`)
  const data = await res.json()
  fileContent.innerHTML = data
}

// Delete file from API
const deleteFile = async (filename) => {
  await fetch(`${BACKEND_URL}/file?filename=${filename}`, {
    method: 'DELETE'
  })
}

// Build file list items
const buildList = async () => {
  const files = await getFiles()

  files.forEach(file => {
    // Create li
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between')
    
    // Create span inside li
    const fileSpan = document.createElement('span')
    fileSpan.textContent = file
    fileSpan.classList.add('file-name')
    fileSpan.addEventListener('click', () => {
      readFile(file)
    })

    // Create delete button inside li
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm')
    deleteBtn.addEventListener('click', () => {
      deleteFile(file)
    })

    li.appendChild(fileSpan)
    li.appendChild(deleteBtn)
    filesList.appendChild(li)
  })
}

// Run build list
buildList()